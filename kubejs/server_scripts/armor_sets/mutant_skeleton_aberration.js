// Vanquish - Mutant Skeleton Masterful set controller
// Rule:
// - Complete normal set: no additional Vanquish effect.
// - Four pieces with tool_quality:41: Aberration + hidden component effects.
//
// Uses KubeJS-native ItemStack wrappers on purpose:
// player.armorSlots + stack.id + stack.nbt.tool_quality.

const VQ_AB_ARMOR_IDS = [
  'mutantmonsters:mutant_skeleton_skull',
  'mutantmonsters:mutant_skeleton_chestplate',
  'mutantmonsters:mutant_skeleton_leggings',
  'mutantmonsters:mutant_skeleton_boots'
]

function vqAbIsMasterfulMutantPiece(stack) {
  if (stack == null || stack.empty) return false
  if (VQ_AB_ARMOR_IDS.indexOf(String(stack.id)) === -1) return false
  if (stack.nbt == null) return false

  return Number(stack.nbt.tool_quality) === 41
}

function vqAbHasFullMasterfulSet(player) {
  let validPieces = 0

  player.armorSlots.forEach(stack => {
    if (vqAbIsMasterfulMutantPiece(stack)) {
      validPieces++
    }
  })

  return validPieces === 4
}

function vqAbApplyEffect(player, effectId, amplifier, visible) {
  // 50 ticks = 2.5 seconds. Refreshed every 10 server ticks.
  // visible=false hides the internal component effects.
  player.potionEffects.add(effectId, 50, amplifier, false, visible)
}

ServerEvents.tick(event => {
  if (event.server.tickCount % 10 !== 0) return

  event.server.players.forEach(player => {
    if (!vqAbHasFullMasterfulSet(player)) {
      // Only the facade is forcibly removed. Internal effects expire naturally,
      // avoiding deletion of the same effects granted by another source.
      if (player.hasEffect('kubejs:aberration')) {
        player.removeEffect('kubejs:aberration')
      }
      return
    }

    // Visible facade.
    vqAbApplyEffect(player, 'kubejs:aberration', 0, true)

    // Hidden component effects.
    vqAbApplyEffect(player, 'majruszsdifficulty:bleeding_immunity', 0, false)
    vqAbApplyEffect(player, 'minecraft:hunger', 0, false)
    vqAbApplyEffect(player, 'minecraft:unluck', 0, false)
    vqAbApplyEffect(player, 'quark:resilience', 1, false)
    vqAbApplyEffect(player, 'minecraft:resistance', 1, false)
  })
})
