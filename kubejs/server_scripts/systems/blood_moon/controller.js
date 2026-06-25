// Vanquish Blood Moon Controller
//
// Responsabilités de cette première version :
// - effectuer un seul jet par nuit ;
// - choisir le palier Pré-Hardmode ou Hardmode ;
// - déclencher la Blood Moon native de Majrusz ;
// - exposer des phases In Control ;
// - arrêter proprement l'événement au lever du jour ;
// - restaurer l'état après un redémarrage ;
// - fournir des commandes de test administrateur.

const VANQUISH_BLOOD_MOON = {
  // Majrusz autorise une Blood Moon entre 12300 et 23600 ticks.
  nightStart: 12300,
  nightEnd: 23600,

  // Fenêtre pendant laquelle Vanquish effectue le jet de la nuit.
  // Une fenêtre, plutôt qu'un tick exact, évite de rater le jet lors d'un lag.
  rollWindowEnd: 13000,

  // Un contrôle par seconde suffit largement.
  checkIntervalTicks: 20,

  // Valeurs provisoires : volontairement séparées dès maintenant.
  chance: {
    preHardmode: 0.0666,
    hardmode: 0.0666
  },

  phases: {
    active: 'vanquish_bloodmoon',
    preHardmode: 'vanquish_bloodmoon_pre',
    hardmode: 'vanquish_bloodmoon_hard'
  },

  dataKeys: {
    active: 'vanquish_bloodmoon_active',
    tier: 'vanquish_bloodmoon_tier',
    lastRollDay: 'vanquish_bloodmoon_last_roll_day'
  },

  debug: true
}

let vanquishBloodMoonTickCounter = 0

function bloodMoonLog(message) {
  if (VANQUISH_BLOOD_MOON.debug) {
    console.info(`[Vanquish Blood Moon] ${message}`)
  }
}

function getBloodMoonTime(server) {
  const absoluteTime = Number(server.overworld().getDayTime())
  const relativeTime = ((absoluteTime % 24000) + 24000) % 24000

  return {
    absolute: absoluteTime,
    relative: relativeTime,
    day: Math.floor(absoluteTime / 24000)
  }
}

function isValidBloodMoonTime(relativeTime) {
  return relativeTime >= VANQUISH_BLOOD_MOON.nightStart
    && relativeTime <= VANQUISH_BLOOD_MOON.nightEnd
}

function clearBloodMoonPhases(server) {
  server.runCommandSilent(
    `incontrol clearphase ${VANQUISH_BLOOD_MOON.phases.active}`
  )

  server.runCommandSilent(
    `incontrol clearphase ${VANQUISH_BLOOD_MOON.phases.preHardmode}`
  )

  server.runCommandSilent(
    `incontrol clearphase ${VANQUISH_BLOOD_MOON.phases.hardmode}`
  )
}

function applyBloodMoonPhases(server, tier) {
  clearBloodMoonPhases(server)

  server.runCommandSilent(
    `incontrol setphase ${VANQUISH_BLOOD_MOON.phases.active}`
  )

  if (tier === 'hardmode') {
    server.runCommandSilent(
      `incontrol setphase ${VANQUISH_BLOOD_MOON.phases.hardmode}`
    )
  } else {
    server.runCommandSilent(
      `incontrol setphase ${VANQUISH_BLOOD_MOON.phases.preHardmode}`
    )
  }
}

function startVanquishBloodMoon(server, tier) {
  const time = getBloodMoonTime(server)
  const data = server.persistentData

  if (!isValidBloodMoonTime(time.relative)) {
    bloodMoonLog(
      `Start refused: daytime ${time.relative} is outside the valid night window.`
    )
    return false
  }

  // Permet également de changer manuellement de palier pendant les tests.
  if (data.getBoolean(VANQUISH_BLOOD_MOON.dataKeys.active)) {
    stopVanquishBloodMoon(server)
  }

  // Déclenche le moteur natif Majrusz :
  // ciel rouge, taux de spawn, CRD et messages natifs.
  server.runCommandSilent('bloodmoon start')

  data.putBoolean(VANQUISH_BLOOD_MOON.dataKeys.active, true)
  data.putString(VANQUISH_BLOOD_MOON.dataKeys.tier, tier)

  applyBloodMoonPhases(server, tier)

  bloodMoonLog(
    `Started ${tier} Blood Moon on world day ${time.day}.`
  )

  return true
}

function stopVanquishBloodMoon(server) {
  const data = server.persistentData
  const wasActive = data.getBoolean(
    VANQUISH_BLOOD_MOON.dataKeys.active
  )

  // Nécessaire puisque le déclencheur natif Majrusz reste désactivé.
  server.runCommandSilent('bloodmoon stop')

  clearBloodMoonPhases(server)

  data.putBoolean(VANQUISH_BLOOD_MOON.dataKeys.active, false)
  data.remove(VANQUISH_BLOOD_MOON.dataKeys.tier)

  if (wasActive) {
    bloodMoonLog('Blood Moon finished.')
  }

  return wasActive
}

function rollVanquishBloodMoon(server, day) {
  const data = server.persistentData
  const isHardmode = data.getBoolean('vanquish_expert_unlocked')

  const tier = isHardmode
    ? 'hardmode'
    : 'pre_hardmode'

  const chance = isHardmode
    ? VANQUISH_BLOOD_MOON.chance.hardmode
    : VANQUISH_BLOOD_MOON.chance.preHardmode

  const roll = Math.random()

  bloodMoonLog(
    `Night roll: ${roll.toFixed(4)} / ${chance} — tier ${tier}, day ${day}.`
  )

  if (roll < chance) {
    startVanquishBloodMoon(server, tier)
  }
}

// Vérification automatique de la nuit.
ServerEvents.tick(event => {
  vanquishBloodMoonTickCounter++

  if (
    vanquishBloodMoonTickCounter
    < VANQUISH_BLOOD_MOON.checkIntervalTicks
  ) {
    return
  }

  vanquishBloodMoonTickCounter = 0

  const server = event.server
  const data = server.persistentData
  const time = getBloodMoonTime(server)

  const active = data.getBoolean(
    VANQUISH_BLOOD_MOON.dataKeys.active
  )

  // Lever du jour, saut temporel ou commande /time.
  if (active && !isValidBloodMoonTime(time.relative)) {
    stopVanquishBloodMoon(server)
    return
  }

  // Aucun jet en dehors du début de nuit.
  if (
    time.relative < VANQUISH_BLOOD_MOON.nightStart
    || time.relative >= VANQUISH_BLOOD_MOON.rollWindowEnd
  ) {
    return
  }

  // Ne pas déclencher un événement que personne ne pourra jouer.
  if (server.getPlayerList().getPlayerCount() === 0) {
    return
  }

  // day + 1 évite que la valeur NBT par défaut 0 bloque le premier jour.
  const rollToken = time.day + 1
  const lastRollToken = data.getLong(
    VANQUISH_BLOOD_MOON.dataKeys.lastRollDay
  )

  if (lastRollToken === rollToken) {
    return
  }

  data.putLong(
    VANQUISH_BLOOD_MOON.dataKeys.lastRollDay,
    rollToken
  )

  rollVanquishBloodMoon(server, time.day)
})

// Restauration après le redémarrage du serveur.
ServerEvents.loaded(event => {
  const server = event.server
  const data = server.persistentData
  const time = getBloodMoonTime(server)

  const active = data.getBoolean(
    VANQUISH_BLOOD_MOON.dataKeys.active
  )

  const tier = data.getString(
    VANQUISH_BLOOD_MOON.dataKeys.tier
  )

  if (
    active
    && isValidBloodMoonTime(time.relative)
    && (tier === 'pre_hardmode' || tier === 'hardmode')
  ) {
    // Si Majrusz a déjà restauré son propre état, la commande échoue
    // silencieusement sans doubler l'événement.
    // Dans le cas contraire, elle le restaure.
    server.runCommandSilent('bloodmoon start')
    applyBloodMoonPhases(server, tier)

    bloodMoonLog(`Restored active ${tier} Blood Moon.`)
    return
  }

  stopVanquishBloodMoon(server)
})

// Commandes administrateur de prototype.
ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event

  event.register(
    Commands.literal('vanquish_bloodmoon')
      .requires(source => source.hasPermission(2))

      .then(
        Commands.literal('start')
          .then(
            Commands.literal('pre')
              .executes(context => {
                return startVanquishBloodMoon(
                  context.source.server,
                  'pre_hardmode'
                ) ? 1 : 0
              })
          )
          .then(
            Commands.literal('hard')
              .executes(context => {
                return startVanquishBloodMoon(
                  context.source.server,
                  'hardmode'
                ) ? 1 : 0
              })
          )
      )

      .then(
        Commands.literal('stop')
          .executes(context => {
            stopVanquishBloodMoon(context.source.server)
            return 1
          })
      )
  )
})