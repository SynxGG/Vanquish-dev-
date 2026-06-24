LootJS.modifiers(event => {
  event
    .addLootTableModifier('aquaculture:gameplay/fishing/fish')

    // Condition 1 : être dans le biome spécial
    .biome('#vanquish:soulforged_fishing')

    // Condition 2 : utiliser la canne post-Monstrosity
    .customCondition({
      condition: 'minecraft:match_tool',
      predicate: {
        items: [
          'aquaculture:neptunium_fishing_rod'
        ]
      }
    })

    // 25 % lorsque la table de poissons Aquaculture est tirée
    .randomChance(0.25)

    // Une récompense bonus parmi cette liste
    .addWeightedLoot([
      Item.of('aquaculture:neptunium_ingot').withChance(55),
      Item.of('aquaculture:neptunium_ingot', 2).withChance(20),
      Item.of('aquaculture:lockbox').withChance(17),
      Item.of('aquaculture:treasure_chest').withChance(8)
    ])
})