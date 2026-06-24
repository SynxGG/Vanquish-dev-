ServerEvents.recipes(event => {
  event.smelting(
    Item.of('cataclysm:black_steel_ingot', 2),
    'mowziesmobs:wrought_helmet'
  ).xp(0.7).cookingTime(200)

  event.blasting(
    Item.of('cataclysm:black_steel_ingot', 2),
    'mowziesmobs:wrought_helmet'
  ).xp(0.7).cookingTime(100)

  event.smelting(
    Item.of('cataclysm:black_steel_ingot', 2),
    'cataclysm:monstrous_horn'
  ).xp(0.7).cookingTime(200)

  event.blasting(
    Item.of('cataclysm:black_steel_ingot', 2),
    'cataclysm:monstrous_horn'
  ).xp(0.7).cookingTime(100)

  event.smelting(
    Item.of('cataclysm:black_steel_ingot', 1),
    Item.of('cataclysm:monstrous_helm')
  ).xp(0.7).cookingTime(200)

  event.blasting(
    Item.of('cataclysm:black_steel_ingot', 1),
    Item.of('cataclysm:monstrous_helm',)
  ).xp(0.7).cookingTime(100)

 event.remove({ output: 'apotheosis:hellshelf' })

  event.shaped(
    Item.of('apotheosis:hellshelf', 1),
    [
      'NNN',
      'BSA',
      'NNN'
    ],
    {
      N: 'minecraft:nether_bricks',
      B: 'minecraft:blaze_rod',
      S: '#forge:bookshelves',
      A: 'kubejs:soulforged_alloy'
    }
  )
 event.remove({ output: 'apotheosis:seashelf' })

  event.shaped(
    Item.of('apotheosis:seashelf', 1),
    [
      'NNN',
      'BSA',
      'NNN'
    ],
    {
      N: 'minecraft:prismarine_bricks',
      B: Item.of('minecraft:potion', '{Potion:"minecraft:water"}').strongNBT(),
      S: '#forge:bookshelves',
      A: 'kubejs:soulforged_alloy'
    }
  )
})