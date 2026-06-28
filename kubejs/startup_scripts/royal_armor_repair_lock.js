// ============================================================
// VANQUISH — ROYAL ARMOR REPAIR LOCK
//
// Empêche toutes les armures du mod Royal Variations
// d'être réparées avec des lingots de fer dans une enclume.
//
// Le Royal Armor Fragment reste géré normalement par le mod.
// ============================================================

const $ArmorItem = Java.loadClass(
  'net.minecraft.world.item.ArmorItem'
)

const $BuiltInRegistries = Java.loadClass(
  'net.minecraft.core.registries.BuiltInRegistries'
)

function vqGetItemId(stack) {
  if (stack == null || stack.isEmpty()) {
    return ''
  }

  return String(
    $BuiltInRegistries.ITEM.getKey(stack.getItem())
  )
}

function vqIsRoyalVariationsArmor(stack) {
  if (stack == null || stack.isEmpty()) {
    return false
  }

  const itemId = vqGetItemId(stack)

  return itemId.startsWith('royalvariations:') &&
    stack.getItem() instanceof $ArmorItem
}

ForgeEvents.onEvent(
  'net.minecraftforge.event.AnvilUpdateEvent',
  event => {
    const equipment = event.getLeft()
    const material = event.getRight()

    if (!vqIsRoyalVariationsArmor(equipment)) {
      return
    }

    if (vqGetItemId(material) !== 'minecraft:iron_ingot') {
      return
    }

    // Annulation de la recette d'enclume :
    // aucun résultat, aucun coût, aucun objet consommé.
    event.setCanceled(true)
  }
)