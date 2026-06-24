LootJS.modifiers(event => {
  const MONSTROSITY = 'cataclysm:netherite_monstrosity'

  const INFERNAL_FORGE = 'cataclysm:infernal_forge'
  const MONSTROUS_HORN = 'cataclysm:monstrous_horn'
  const SOULFORGED_ALLOY = 'kubejs:soulforged_alloy'

  // ------------------------------------------------------------
  // Infernal Forge
  // Blacklist totale du drop direct
  // ------------------------------------------------------------

  event
    .addEntityLootModifier(MONSTROSITY)
    .removeLoot(INFERNAL_FORGE)

  // ------------------------------------------------------------
  // Monstrous Horn
  // Retiré du drop garanti, puis réinjecté à 40 %
  // ------------------------------------------------------------

  event
    .addEntityLootModifier(MONSTROSITY)
    .removeLoot(MONSTROUS_HORN)

  event
    .addEntityLootModifier(MONSTROSITY)
    .randomChance(0.4)
    .addLoot(MONSTROUS_HORN)

  // ------------------------------------------------------------
  // Soulforged Alloy
  // 4 garantis + jusqu'à 2 bonus
  // ------------------------------------------------------------

  event
    .addEntityLootModifier(MONSTROSITY)
    .addLoot(Item.of(SOULFORGED_ALLOY, 4))

  event
    .addEntityLootModifier(MONSTROSITY)
    .randomChance(0.5)
    .addLoot(SOULFORGED_ALLOY)

  event
    .addEntityLootModifier(MONSTROSITY)
    .randomChance(0.5)
    .addLoot(SOULFORGED_ALLOY)
})