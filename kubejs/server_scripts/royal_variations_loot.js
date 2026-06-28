// ============================================================
// VANQUISH — ROYAL VARIATIONS LOOT
// ============================================================

LootJS.modifiers(event => {
  const ROYAL_ZOMBIE = 'royalvariations:royal_zombie'
  const ROYAL_STAFF = 'royalvariations:royal_staff'

  // Suppression totale du Royal Staff sur le Royal Zombie.
  event
    .addEntityLootModifier(ROYAL_ZOMBIE)
    .removeLoot(ROYAL_STAFF)
})