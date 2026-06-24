EntityEvents.death(event => {
  const entity = event.entity
  const server = event.server

  if (entity.type !== 'cataclysm:netherite_monstrosity') return

  const data = server.persistentData

  if (data.vanquish_expert_unlocked) return

  data.vanquish_expert_unlocked = true
  data.vanquish_netherite_monstrosity_first_kill = true

  // Expert Mode de Majrusz
  server.runCommandSilent('gamestage expert')

  // Déverrouillage des contenus In Control post-Monstrosity
  server.runCommandSilent('incontrol setphase vanquish_expert')

  server.tell([
    Text.gold(
      'The ancient forces of Olympus have awakened... New threats now roam the world...'
    ).bold()
  ])
})
ServerEvents.loaded(event => {
  const server = event.server

  if (server.persistentData.vanquish_expert_unlocked === true) {
    server.runCommandSilent('incontrol setphase vanquish_expert')
  } else {
    server.runCommandSilent('incontrol clearphase vanquish_expert')
  }
})