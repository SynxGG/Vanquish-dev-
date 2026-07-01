// Vanquish - Mutant Skeleton Masterful set controller
//
// Complete normal set:
// - No extra Vanquish effect.
//
// Four Masterful pieces (tool_quality:41):
// - kubejs:aberration only.
//
// The custom effect itself handles Hunger, Unluck and knockback resistance.
// Forge events handle Bleeding immunity and Resistance II.

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

ServerEvents.tick(event => {
  if (event.server.tickCount % 10 !== 0) return

  event.server.players.forEach(player => {
    if (!vqAbHasFullMasterfulSet(player)) {
      if (player.hasEffect('kubejs:aberration')) {
        player.removeEffect('kubejs:aberration')
      }
      return
    }

    // 50 ticks = 2.5 seconds, refreshed twice per second.
    // Aberration is the only MobEffect applied by this system.
    player.potionEffects.add(
      'kubejs:aberration',
      50,
      0,
      false,
      true
    )

    // Remove an already-active Bleeding effect immediately.
    // Future applications are denied by the Forge listener.
    if (player.hasEffect('majruszsdifficulty:bleeding')) {
      player.removeEffect('majruszsdifficulty:bleeding')
    }
  })
})
