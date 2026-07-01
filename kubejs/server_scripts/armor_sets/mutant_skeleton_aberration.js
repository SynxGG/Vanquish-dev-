// Vanquish - Mutant Skeleton Masterful set controller
//
// Complete normal set:
// - No additional Vanquish effect.
//
// Four Masterful pieces (tool_quality:41):
// - Visible kubejs:aberration facade.
// - Real hidden component effects:
//   Bleeding Immunity, Hunger I, Unluck I, Resilience II, Resistance II.
//
// Inventory HUD+ must keep showHiddenEffects=false so only Aberration is shown.

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
  // 50 ticks = 2.5 seconds, refreshed twice per second.
  // visible=false marks the component effect as hidden.
  player.potionEffects.add(effectId, 50, amplifier, false, visible)
}

ServerEvents.tick(event => {
  if (event.server.tickCount % 10 !== 0) return

  event.server.players.forEach(player => {
    if (!vqAbHasFullMasterfulSet(player)) {
      // Remove the visible facade immediately.
      // Hidden component effects expire naturally within 2.5 seconds.
      if (player.hasEffect('kubejs:aberration')) {
        player.removeEffect('kubejs:aberration')
      }
      return
    }

    // Visible facade.
    vqAbApplyEffect(player, 'kubejs:aberration', 0, true)

    // Real component effects, hidden from HUD.
    vqAbApplyEffect(
      player,
      'majruszsdifficulty:bleeding_immunity',
      0,
      false
    )
    vqAbApplyEffect(player, 'minecraft:hunger', 0, false)
    vqAbApplyEffect(player, 'minecraft:unluck', 0, false)
    vqAbApplyEffect(player, 'quark:resilience', 1, false)
    vqAbApplyEffect(player, 'minecraft:resistance', 1, false)
  })
})
