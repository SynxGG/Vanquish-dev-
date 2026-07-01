// Vanquish - Mutant Skeleton Masterful set controller
// Rule:
// - Complete normal set: no additional Vanquish effect.
// - Four pieces with tool_quality:41: visible Aberration + hidden internal effects.

const VQ_AB_MobEffectInstance = Java.loadClass('net.minecraft.world.effect.MobEffectInstance')
const VQ_AB_ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const VQ_AB_ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
const VQ_AB_EquipmentSlot = Java.loadClass('net.minecraft.world.entity.EquipmentSlot')

const VQ_AB_MUTANT_SKELETON = {
  head: 'mutantmonsters:mutant_skeleton_skull',
  chest: 'mutantmonsters:mutant_skeleton_chestplate',
  legs: 'mutantmonsters:mutant_skeleton_leggings',
  feet: 'mutantmonsters:mutant_skeleton_boots'
}

function vqAbItemId(stack) {
  if (stack == null || stack.isEmpty()) return ''
  const key = VQ_AB_ForgeRegistries.ITEMS.getKey(stack.getItem())
  return key == null ? '' : key.toString()
}

function vqAbIsMasterful(stack) {
  if (stack == null || stack.isEmpty()) return false
  const tag = stack.getTag()
  return tag != null && tag.contains('tool_quality') && tag.getInt('tool_quality') === 41
}

function vqAbArmor(player) {
  return {
    head: player.getItemBySlot(VQ_AB_EquipmentSlot.HEAD),
    chest: player.getItemBySlot(VQ_AB_EquipmentSlot.CHEST),
    legs: player.getItemBySlot(VQ_AB_EquipmentSlot.LEGS),
    feet: player.getItemBySlot(VQ_AB_EquipmentSlot.FEET)
  }
}

function vqAbHasFullMasterfulSet(player) {
  const armor = vqAbArmor(player)

  const correctSet =
    vqAbItemId(armor.head) === VQ_AB_MUTANT_SKELETON.head &&
    vqAbItemId(armor.chest) === VQ_AB_MUTANT_SKELETON.chest &&
    vqAbItemId(armor.legs) === VQ_AB_MUTANT_SKELETON.legs &&
    vqAbItemId(armor.feet) === VQ_AB_MUTANT_SKELETON.feet

  if (!correctSet) return false

  return vqAbIsMasterful(armor.head) &&
    vqAbIsMasterful(armor.chest) &&
    vqAbIsMasterful(armor.legs) &&
    vqAbIsMasterful(armor.feet)
}

function vqAbEffect(id) {
  return VQ_AB_ForgeRegistries.MOB_EFFECTS.getValue(new VQ_AB_ResourceLocation(id))
}

function vqAbApply(player, effect, duration, amplifier, showIcon) {
  if (effect == null) return

  player.addEffect(new VQ_AB_MobEffectInstance(
    effect,
    duration,
    amplifier,
    false,     // ambient
    false,     // particles
    showIcon   // HUD/inventory icon
  ))
}

PlayerEvents.tick(event => {
  const player = event.player

  // Two checks per second.
  if (player.age % 10 !== 0) return

  const aberration = vqAbEffect('kubejs:aberration')
  if (aberration == null) return

  if (!vqAbHasFullMasterfulSet(player)) {
    // Remove the facade immediately. Hidden internal effects naturally expire
    // within 30 ticks, avoiding deletion of longer effects from other sources.
    if (player.hasEffect(aberration)) player.removeEffect(aberration)
    return
  }

  // Visible facade. No particles, but its own icon remains visible.
  vqAbApply(player, aberration, 30, 0, true)

  // Existing effects applied invisibly under the Aberration facade.
  vqAbApply(player, vqAbEffect('majruszsdifficulty:bleeding_immunity'), 30, 0, false)
  vqAbApply(player, vqAbEffect('minecraft:hunger'), 30, 0, false)
  vqAbApply(player, vqAbEffect('minecraft:unluck'), 30, 0, false)
  vqAbApply(player, vqAbEffect('quark:resilience'), 30, 1, false)
  vqAbApply(player, vqAbEffect('minecraft:resistance'), 30, 1, false)
})
