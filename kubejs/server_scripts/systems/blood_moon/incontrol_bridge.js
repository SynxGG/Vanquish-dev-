// Vanquish — Blood Moon / In Control bridge
//
// Valeurs In Control :
// 0 = aucune Blood Moon
// 1 = Blood Moon Pré-Hardmode
// 2 = Blood Moon Hardmode

const BloodMoonHelper = Java.loadClass(
  'com.majruszsdifficulty.bloodmoon.BloodMoonHelper'
)

const BLOOD_MOON_NUMBER = 'vanquish_bloodmoon_spawn_table'
const HARDMODE_KEY = 'vanquish_expert_unlocked'

const BLOOD_MOON_NONE = 0
const BLOOD_MOON_PRE = 1
const BLOOD_MOON_HARD = 2

const CHECK_INTERVAL = 20

let bloodMoonBridgeTicks = 0
let lastAppliedState = -1

function resolveBloodMoonSpawnTable(server) {
  // Premier check : l’événement Majrusz est-il réellement actif ?
  if (!BloodMoonHelper.isActive()) {
    return BLOOD_MOON_NONE
  }

  // Second check : quel est le palier mondial Vanquish ?
  const hardmodeUnlocked =
    server.persistentData.getBoolean(HARDMODE_KEY)

  return hardmodeUnlocked
    ? BLOOD_MOON_HARD
    : BLOOD_MOON_PRE
}

function applyBloodMoonSpawnTable(server, state, force) {
  if (!force && state === lastAppliedState) {
    return
  }

  server.runCommandSilent(
    `incontrol setnumber ${BLOOD_MOON_NUMBER} ${state}`
  )

  lastAppliedState = state

  const stateName =
    state === BLOOD_MOON_PRE
      ? 'PRE_HARDMODE'
      : state === BLOOD_MOON_HARD
        ? 'HARDMODE'
        : 'INACTIVE'

  console.info(
    `[Vanquish Blood Moon] In Control table = ${stateName} (${state})`
  )
}

ServerEvents.loaded(event => {
  lastAppliedState = -1

  const state = resolveBloodMoonSpawnTable(event.server)
  applyBloodMoonSpawnTable(event.server, state, true)
})

ServerEvents.tick(event => {
  bloodMoonBridgeTicks++

  if (bloodMoonBridgeTicks < CHECK_INTERVAL) {
    return
  }

  bloodMoonBridgeTicks = 0

  const state = resolveBloodMoonSpawnTable(event.server)
  applyBloodMoonSpawnTable(event.server, state, false)
})