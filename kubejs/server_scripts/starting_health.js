// ============================================================
// VANQUISH — STARTING HEALTH
// Base de départ : 3 cœurs = 6 HP
// Compatible monde sans cheats.
// ============================================================

const VANQUISH_STARTING_MAX_HEALTH = 6

function applyStartingHealth(server, player) {
  const name = player.username

  // Exécuté par le serveur, donc fonctionne même si Allow Cheats = false
  server.runCommandSilent(
    `attribute ${name} minecraft:generic.max_health base set ${VANQUISH_STARTING_MAX_HEALTH}`
  )

  server.runCommandSilent(
    `data merge entity ${name} {Health:${VANQUISH_STARTING_MAX_HEALTH}.0f}`
  )
}

PlayerEvents.loggedIn(event => {
  applyStartingHealth(event.server, event.player)

  // Deuxième passage juste après le spawn,
  // au cas où un mod réapplique ses attributs après login.
  event.server.scheduleInTicks(10, callback => {
    applyStartingHealth(event.server, event.player)
  })
})

PlayerEvents.respawned(event => {
  applyStartingHealth(event.server, event.player)

  event.server.scheduleInTicks(10, callback => {
    applyStartingHealth(event.server, event.player)
  })
})