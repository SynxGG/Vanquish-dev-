// kubejs/server_scripts/systems/blood_moon/controller.js
//
// Bridge Vanquish : Majrusz Blood Moon -> In Control number system
//
// Valeurs du nombre In Control :
//   0 = aucune Blood Moon active
//   1 = Blood Moon Pré-Hardmode
//   2 = Blood Moon Hardmode
//
// Ce script ne déclenche pas lui-même la Blood Moon.
// Majrusz reste la source de vérité via BloodMoonHelper.isActive().

const VanquishBloodMoonHelper = Java.loadClass(
  'com.majruszsdifficulty.bloodmoon.BloodMoonHelper'
)

const VANQUISH_BLOOD_MOON_NUMBER = 'vanquish_bloodmoon_spawn_table'
const VANQUISH_HARDMODE_FLAG = 'vanquish_expert_unlocked'

const VANQUISH_BLOOD_MOON_NONE = 0
const VANQUISH_BLOOD_MOON_PRE = 1
const VANQUISH_BLOOD_MOON_HARD = 2

// Vérifie l'état une fois par seconde.
const VANQUISH_BLOOD_MOON_CHECK_INTERVAL = 20

// Réapplique périodiquement le nombre, notamment après un /incontrol reload.
const VANQUISH_BLOOD_MOON_FORCE_SYNC_INTERVAL = 600

let vanquishBloodMoonTickCounter = 0
let vanquishBloodMoonForceSyncCounter = 0
let vanquishBloodMoonLastState = -1

function vanquishIsHardmodeUnlocked(server) {
  // Ce flag est posé lors de la première mort de la Netherite Monstrosity.
  return server.persistentData.getBoolean(VANQUISH_HARDMODE_FLAG)
}

function vanquishResolveBloodMoonState(server) {
  // Check 1 : la Blood Moon Majrusz est-elle réellement active ?
  if (!VanquishBloodMoonHelper.isActive()) {
    return VANQUISH_BLOOD_MOON_NONE
  }

  // Check 2 : le monde est-il en Pré-Hardmode ou en Hardmode ?
  return vanquishIsHardmodeUnlocked(server)
    ? VANQUISH_BLOOD_MOON_HARD
    : VANQUISH_BLOOD_MOON_PRE
}

function vanquishBloodMoonStateName(state) {
  if (state === VANQUISH_BLOOD_MOON_PRE) return 'PRE_HARDMODE'
  if (state === VANQUISH_BLOOD_MOON_HARD) return 'HARDMODE'
  return 'INACTIVE'
}

function vanquishApplyBloodMoonState(server, state, force) {
  if (!force && state === vanquishBloodMoonLastState) {
    return
  }

  const commandResult = server.runCommandSilent(
    `incontrol setnumber ${VANQUISH_BLOOD_MOON_NUMBER} ${state}`
  )

  if (commandResult === 0) {
    console.error(
      `[Vanquish Blood Moon] Échec de la commande In Control pour la valeur ${state}.`
    )
    return
  }

  vanquishBloodMoonLastState = state
  vanquishBloodMoonForceSyncCounter = 0

  console.info(
    `[Vanquish Blood Moon] ${VANQUISH_BLOOD_MOON_NUMBER} = ${state} ` +
    `(${vanquishBloodMoonStateName(state)})`
  )
}

function vanquishSynchronizeBloodMoon(server, force) {
  const state = vanquishResolveBloodMoonState(server)
  vanquishApplyBloodMoonState(server, state, force)
}

// Synchronisation immédiate au chargement du serveur.
ServerEvents.loaded(event => {
  vanquishBloodMoonTickCounter = 0
  vanquishBloodMoonForceSyncCounter = 0
  vanquishBloodMoonLastState = -1

  vanquishSynchronizeBloodMoon(event.server, true)
})

// Synchronisation légère pendant le jeu.
ServerEvents.tick(event => {
  vanquishBloodMoonTickCounter++

  if (
    vanquishBloodMoonTickCounter <
    VANQUISH_BLOOD_MOON_CHECK_INTERVAL
  ) {
    return
  }

  vanquishBloodMoonTickCounter = 0
  vanquishBloodMoonForceSyncCounter +=
    VANQUISH_BLOOD_MOON_CHECK_INTERVAL

  const force =
    vanquishBloodMoonForceSyncCounter >=
    VANQUISH_BLOOD_MOON_FORCE_SYNC_INTERVAL

  vanquishSynchronizeBloodMoon(event.server, force)
})
