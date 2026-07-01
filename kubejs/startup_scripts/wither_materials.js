// Vanquish - Wither materials
// Startup script: a full game restart is required after adding or changing this file.

StartupEvents.registry('item', event => {
  event
    .create('wither_bone')
    .displayName('Wither Bone')
    .maxStackSize(64)
    .texture('minecraft:item/bone')

  event
    .create('wither_dust')
    .displayName('Wither Dust')
    .maxStackSize(64)
    .texture('minecraft:item/gunpowder')
})
