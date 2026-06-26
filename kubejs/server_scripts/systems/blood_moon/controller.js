// kubejs/server_scripts/systems/blood_moon/controller.js
//
// Bridge Vanquish : Majrusz Blood Moon -> In Control number system
//
// Valeurs In Control :
//   0 = inactif
//   1 = Blood Moon Pré-Hardmode
//   2 = Blood Moon Hardmode
//
// Overrides de debug, non persistants :
//   0 = AUTO
//   1 = force PRE
//   2 = force HARD
//   3 = force OFF

const VanquishBloodMoonHelper = Java.loadClass(
  'com.majruszsdifficulty.bloodmoon.BloodMoonHelper'
)

const VanquishBloodMoonComponent = Java.loadClass(
  'net.minecraft.network.chat.Component'
)

const VANQUISH_BLOOD_MOON_NUMBER =
  'vanquish_bloodmoon_spawn_table'

const VANQUISH_HARDMODE_FLAG =
  'vanquish_expert_unlocked'

const VANQUISH_BLOOD_MOON_NONE = 0
const VANQUISH_BLOOD_MOON_PRE = 1
const VANQUISH_BLOOD_MOON_HARD = 2

const VANQUISH_BLOOD_MOON_DEBUG_AUTO = 0
const VANQUISH_BLOOD_MOON_DEBUG_PRE = 1
const VANQUISH_BLOOD_MOON_DEBUG_HARD = 2
const VANQUISH_BLOOD_MOON_DEBUG_OFF = 3

// Vérification une fois par seconde.
const VANQUISH_BLOOD_MOON_CHECK_INTERVAL = 20

// Réapplication toutes les 30 secondes.
// Utile après un reload In Control ou une éventuelle désynchronisation.
const VANQUISH_BLOOD_MOON_FORCE_SYNC_INTERVAL = 600

let vanquishBloodMoonTickCounter = 0
let vanquishBloodMoonForceSyncCounter = 0
let vanquishBloodMoonLastState = -1

// L'override reste volontairement temporaire.
// Il repasse sur AUTO après redémarrage ou reload des scripts.
let vanquishBloodMoonDebugOverride =
  VANQUISH_BLOOD_MOON_DEBUG_AUTO


function vanquishIsHardmodeUnlocked(server) {
  return server.persistentData.getBoolean(
    VANQUISH_HARDMODE_FLAG
  )
}


function vanquishResolveBloodMoonState(server) {
  // Les overrides de debug ignorent volontairement
  // l'état réel de Majrusz.

  if (
    vanquishBloodMoonDebugOverride ===
    VANQUISH_BLOOD_MOON_DEBUG_PRE
  ) {
    return VANQUISH_BLOOD_MOON_PRE
  }

  if (
    vanquishBloodMoonDebugOverride ===
    VANQUISH_BLOOD_MOON_DEBUG_HARD
  ) {
    return VANQUISH_BLOOD_MOON_HARD
  }

  if (
    vanquishBloodMoonDebugOverride ===
    VANQUISH_BLOOD_MOON_DEBUG_OFF
  ) {
    return VANQUISH_BLOOD_MOON_NONE
  }

  // Mode AUTO : Majrusz redevient la source de vérité.
  if (!VanquishBloodMoonHelper.isActive()) {
    return VANQUISH_BLOOD_MOON_NONE
  }

  return vanquishIsHardmodeUnlocked(server)
    ? VANQUISH_BLOOD_MOON_HARD
    : VANQUISH_BLOOD_MOON_PRE
}


function vanquishBloodMoonStateName(state) {
  if (state === VANQUISH_BLOOD_MOON_PRE) {
    return 'PRE_HARDMODE'
  }

  if (state === VANQUISH_BLOOD_MOON_HARD) {
    return 'HARDMODE'
  }

  return 'INACTIVE'
}


function vanquishBloodMoonDebugName(override) {
  if (override === VANQUISH_BLOOD_MOON_DEBUG_PRE) {
    return 'PRE'
  }

  if (override === VANQUISH_BLOOD_MOON_DEBUG_HARD) {
    return 'HARD'
  }

  if (override === VANQUISH_BLOOD_MOON_DEBUG_OFF) {
    return 'OFF'
  }

  return 'AUTO'
}


function vanquishApplyBloodMoonState(
  server,
  state,
  force
) {
  const changed =
    state !== vanquishBloodMoonLastState

  if (!force && !changed) {
    return true
  }

  const commandResult = server.runCommandSilent(
    `incontrol setnumber ` +
    `${VANQUISH_BLOOD_MOON_NUMBER} ${state}`
  )

  if (commandResult === 0) {
    console.error(
      `[Vanquish Blood Moon] ` +
      `Échec de setnumber pour la valeur ${state}.`
    )

    return false
  }

  vanquishBloodMoonLastState = state
  vanquishBloodMoonForceSyncCounter = 0

  if (changed) {
    console.info(
      `[Vanquish Blood Moon] ` +
      `${VANQUISH_BLOOD_MOON_NUMBER} = ${state} ` +
      `(${vanquishBloodMoonStateName(state)})`
    )
  }

  return true
}


function vanquishSynchronizeBloodMoon(
  server,
  force
) {
  const state =
    vanquishResolveBloodMoonState(server)

  return vanquishApplyBloodMoonState(
    server,
    state,
    force
  )
}


function vanquishBloodMoonTell(
  source,
  message
) {
  source.sendSystemMessage(
    VanquishBloodMoonComponent.literal(message)
  )
}


function vanquishBloodMoonSetDebug(
  source,
  override
) {
  const server = source.getServer()

  vanquishBloodMoonDebugOverride = override

  // Force une mise à jour immédiate, même si la valeur
  // précédente semblait identique.
  vanquishBloodMoonLastState = -1

  const success =
    vanquishSynchronizeBloodMoon(
      server,
      true
    )

  const effectiveState =
    vanquishResolveBloodMoonState(server)

  vanquishBloodMoonTell(
    source,
    `[Vanquish] Blood Moon debug = ` +
    `${vanquishBloodMoonDebugName(override)} | ` +
    `table effective = ${effectiveState} ` +
    `(${vanquishBloodMoonStateName(effectiveState)})`
  )

  return success ? 1 : 0
}


function vanquishBloodMoonStatus(source) {
  const server = source.getServer()

  const majruszActive =
    VanquishBloodMoonHelper.isActive()

  const hardmodeUnlocked =
    vanquishIsHardmodeUnlocked(server)

  const effectiveState =
    vanquishResolveBloodMoonState(server)

  vanquishBloodMoonTell(
    source,
    '[Vanquish] Blood Moon status'
  )

  vanquishBloodMoonTell(
    source,
    `- Majrusz active: ${majruszActive}`
  )

  vanquishBloodMoonTell(
    source,
    `- Hardmode flag: ${hardmodeUnlocked}`
  )

  vanquishBloodMoonTell(
    source,
    `- Debug override: ` +
    `${vanquishBloodMoonDebugName(
      vanquishBloodMoonDebugOverride
    )}`
  )

  vanquishBloodMoonTell(
    source,
    `- Effective In Control table: ` +
    `${effectiveState} ` +
    `(${vanquishBloodMoonStateName(
      effectiveState
    )})`
  )

  return 1
}


// ---------------------------------------------------------
// COMMANDES
// ---------------------------------------------------------

ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event

  event.register(
    Commands.literal('vanquish')
      .requires(source =>
        source.hasPermission(2)
      )
      .then(
        Commands.literal('bloodmoon')

          .executes(ctx =>
            vanquishBloodMoonStatus(
              ctx.source
            )
          )

          .then(
            Commands.literal('status')
              .executes(ctx =>
                vanquishBloodMoonStatus(
                  ctx.source
                )
              )
          )

          .then(
            Commands.literal('debug')

              .then(
                Commands.literal('auto')
                  .executes(ctx =>
                    vanquishBloodMoonSetDebug(
                      ctx.source,
                      VANQUISH_BLOOD_MOON_DEBUG_AUTO
                    )
                  )
              )

              .then(
                Commands.literal('pre')
                  .executes(ctx =>
                    vanquishBloodMoonSetDebug(
                      ctx.source,
                      VANQUISH_BLOOD_MOON_DEBUG_PRE
                    )
                  )
              )

              .then(
                Commands.literal('hard')
                  .executes(ctx =>
                    vanquishBloodMoonSetDebug(
                      ctx.source,
                      VANQUISH_BLOOD_MOON_DEBUG_HARD
                    )
                  )
              )

              .then(
                Commands.literal('off')
                  .executes(ctx =>
                    vanquishBloodMoonSetDebug(
                      ctx.source,
                      VANQUISH_BLOOD_MOON_DEBUG_OFF
                    )
                  )
              )
          )
      )
  )
})


// ---------------------------------------------------------
// SYNCHRONISATION
// ---------------------------------------------------------

ServerEvents.loaded(event => {
  vanquishBloodMoonTickCounter = 0
  vanquishBloodMoonForceSyncCounter = 0
  vanquishBloodMoonLastState = -1

  // Un redémarrage ne doit jamais conserver
  // un état de debug forcé.
  vanquishBloodMoonDebugOverride =
    VANQUISH_BLOOD_MOON_DEBUG_AUTO

  vanquishSynchronizeBloodMoon(
    event.server,
    true
  )
})


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

  vanquishSynchronizeBloodMoon(
    event.server,
    force
  )
})