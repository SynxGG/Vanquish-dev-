//SOULFORGED ALLOY
StartupEvents.registry('item', event => {
  event.create('soulforged_alloy')
    .displayName('Soulforged Alloy')
    .maxStackSize(64)
})
//BOWS
StartupEvents.registry('item', event => {
  event
    .create('iron_stick')
    .displayName('Iron Stick')
    .maxStackSize(64)

  event
    .create('emerald_bow')
    .displayName('Emerald Bow')
    .maxStackSize(1)
})