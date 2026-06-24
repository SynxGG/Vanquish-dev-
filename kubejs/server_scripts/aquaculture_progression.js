ServerEvents.recipes(event => {
  event.remove({
    output: 'aquaculture:neptunium_fishing_rod'
  })

  event.shaped(
    'aquaculture:neptunium_fishing_rod',
    [
      '  B',
      ' AS',
      'IS '
    ],
    {
      B: 'minecraft:stick',
      A: 'kubejs:soulforged_alloy',
      I: 'minecraft:iron_ingot',
      S: 'minecraft:string'
    }
  ).id('vanquish:soulforged_fishing_rod')
})