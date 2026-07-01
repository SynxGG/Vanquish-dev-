// Vanquish - Goblin Trader and Wither Skeleton loot integration
// LootJS 1.20.1 / 2.13.x compatible syntax.

LootJS.modifiers(event => {
  const GOBLIN_TRADER = 'goblintraders:goblin_trader'
  const GOBLIN_MEAT = 'goblins:goblin_meat'
  const WITHER_BONE = 'kubejs:wither_bone'

  // Goblin Trader: 1 guaranteed meat + 50% chance for a second one.
  // Final distribution: exactly 1-2 meat, uniformly.
  event
    .addEntityLootModifier(GOBLIN_TRADER)
    .addLoot(GOBLIN_MEAT)

  event
    .addEntityLootModifier(GOBLIN_TRADER)
    .randomChance(0.5)
    .addLoot(GOBLIN_MEAT)

  // Goblin Trader: 10% total chance to drop exactly one random tool.
  // Equal weights: knife / axe / pickaxe.
  event
    .addEntityLootModifier(GOBLIN_TRADER)
    .randomChance(0.10)
    .addWeightedLoot([
      Item.of('goblins:goblin_knife').withChance(1),
      Item.of('goblins:goblin_axe').withChance(1),
      Item.of('goblins:goblin_pickaxe').withChance(1)
    ])

  // Wither Skeleton: 1 guaranteed Wither Bone + 50% chance for a second one.
  // Final distribution: exactly 1-2 Wither Bones, uniformly.
  event
    .addEntityLootModifier('minecraft:wither_skeleton')
    .addLoot(WITHER_BONE)

  event
    .addEntityLootModifier('minecraft:wither_skeleton')
    .randomChance(0.5)
    .addLoot(WITHER_BONE)
})
