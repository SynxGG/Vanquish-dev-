// Vanquish - Wither Armor anvil repair
// Native Forge listeners must be registered from startup_scripts in KubeJS 1.20.1.
// Bone is rejected; Wither Bone repairs 25% max durability per material.

const VQ_ANVIL_ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
const VQ_ANVIL_Component = Java.loadClass('net.minecraft.network.chat.Component')

const VQ_ANVIL_WITHER_ARMOR = [
  'immersive_armors:wither_helmet',
  'immersive_armors:wither_chestplate',
  'immersive_armors:wither_leggings',
  'immersive_armors:wither_boots'
]

function vqAnvilItemId(stack) {
  if (stack == null || stack.isEmpty()) return ''
  const key = VQ_ANVIL_ForgeRegistries.ITEMS.getKey(stack.getItem())
  return key == null ? '' : key.toString()
}

ForgeEvents.onEvent('net.minecraftforge.event.AnvilUpdateEvent', event => {
  const left = event.getLeft()
  const right = event.getRight()

  if (left == null || right == null || left.isEmpty() || right.isEmpty()) return

  const leftId = vqAnvilItemId(left)
  if (VQ_ANVIL_WITHER_ARMOR.indexOf(leftId) === -1) return

  const rightId = vqAnvilItemId(right)

  // Remove Immersive Armors' native Bone repair route.
  if (rightId === 'minecraft:bone') {
    event.setCanceled(true)
    return
  }

  // Preserve normal anvil operations such as enchanted books or combining equal pieces.
  if (rightId !== 'kubejs:wither_bone') return

  if (!left.isDamaged()) {
    event.setCanceled(true)
    return
  }

  const output = left.copy()
  const repairPerBone = Math.max(1, Math.floor(output.getMaxDamage() / 4))
  const materialsNeeded = Math.ceil(output.getDamageValue() / repairPerBone)
  const materialsConsumed = Math.min(right.getCount(), materialsNeeded)

  output.setDamageValue(Math.max(
    0,
    output.getDamageValue() - repairPerBone * materialsConsumed
  ))

  // Keep an optional rename entered in the anvil GUI.
  const requestedName = event.getName()
  if (requestedName != null) {
    if (requestedName.length === 0) {
      output.resetHoverName()
    } else if (requestedName !== left.getHoverName().getString()) {
      output.setHoverName(VQ_ANVIL_Component.literal(requestedName))
    }
  }

  event.setOutput(output)
  event.setMaterialCost(materialsConsumed)
  event.setCost(Math.max(1, materialsConsumed))
})
