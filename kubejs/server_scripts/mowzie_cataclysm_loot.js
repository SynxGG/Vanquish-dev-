LootJS.modifiers(event => {
  const WROUGHTNAUT = 'mowziesmobs:ferrous_wroughtnaut'

  // À vérifier avec /kjs hand
  const AXE = 'mowziesmobs:wrought_axe'
  const BLACK_STEEL = 'cataclysm:black_steel_ingot'
  const WROUGHT_HELM = 'mowziesmobs:wrought_helmet'

  // ------------------------------------------------------------
  // Axe of a Thousand Metals
  // Retire le drop vanilla/mod, puis le réinjecte en drop rare.
  // ------------------------------------------------------------

  event
    .addEntityLootModifier(WROUGHTNAUT)
    .removeLoot(AXE)

  event
    .addEntityLootModifier(WROUGHTNAUT)
    .randomChance(0.125)
    .addLoot(AXE)

  // ------------------------------------------------------------
  // Black Steel
  // 2 lingots garantis + jusqu'à 2 bonus.
  // Résultat final : 2 à 4 ingots.
  // ------------------------------------------------------------

  event
    .addEntityLootModifier(WROUGHTNAUT)
    .addLoot(Item.of(BLACK_STEEL, 2))

  event
    .addEntityLootModifier(WROUGHTNAUT)
    .randomChance(0.5)
    .addLoot(BLACK_STEEL)

  event
    .addEntityLootModifier(WROUGHTNAUT)
    .randomChance(0.5)
    .addLoot(BLACK_STEEL)
  // ------------------------------------------------------------
  // Wrought Helm
  // Drop à 50 %.
  // ------------------------------------------------------------

  event
    .addEntityLootModifier(WROUGHTNAUT)
    .randomChance(0.5)
    .addLoot(WROUGHT_HELM)
})