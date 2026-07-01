// Vanquish - Mutant Skeleton Masterful set controller
// Rule:
// - Complete normal set: no additional Vanquish effect.
// - Four pieces with tool_quality:41: Aberration + hidden component effects.

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
  return tag != null && tag.contains('tool_quality') && tag.getInt('tool_quality') == 41
}

function vqAbHasFullMasterfulSet(player) {
  const head = player.getItemBySlot(VQ_AB_EquipmentSlot.HEAD)
  const chest = player.getItemBySlot(VQ_AB_EquipmentSlot.CHEST)
  const legs = player.getItemBySlot(VQ_AB_EquipmentSlot.LEGS)
  const feet = player.getItemBySlot(VQ_AB_EquipmentSlot.FEET)

  return vqAbItemId(head) == VQ_AB_MUTANT_SKELETON.head &&
    vqAbItemId(chest) == VQ_AB_MUTANT_SKELETON.chest &&
    vqAbItemId(legs) == VQ_AB_MUTANT_SKELETON.legs &&
    vqAbItemId(feet) == VQ_AB_MUTANT_SKELETON.feet &&
    vqAbIsMasterful(head) &&
    vqAbIsMasterful(chest) &&
    vqAbIsMasterful(legs) &&
    vqAbIsMasterful(feet)
}

function vqAbEffect(id) {
  return VQ_AB_ForgeRegistries.MOB_EFFECTS.getValue(new VQ_AB_ResourceLocation(id))
}

function vqAbRefreshEffect(player, effect, duration, amplifier, showIcon) {
  if (effect == null) return

  const current = player.getEffect(effect)
  if (current != null && current.getDuration() > 10 && current.getAmplifier() == amplifier) return

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
  const aberration = vqAbEffect('kubejs:aberration')

  if (aberration == null) return

  if (!vqAbHasFullMasterfulSet(player)) {
    // Remove the visible facade immediately. Hidden component effects expire
    // naturally, so effects from another source are not forcibly deleted.
    if (player.hasEffect(aberration)) player.removeEffect(aberration)
    return
  }

  // Visible facade.
  vqAbRefreshEffect(player, aberration, 30, 0, true)

  // Hidden component effects.
  vqAbRefreshEffect(player, vqAbEffect('majruszsdifficulty:bleeding_immunity'), 30, 0, false)
  vqAbRefreshEffect(player, vqAbEffect('minecraft:hunger'), 30, 0, false)
  vqAbRefreshEffect(player, vqAbEffect('minecraft:unluck'), 30, 0, false)
  vqAbRefreshEffect(player, vqAbEffect('quark:resilience'), 30, 1, false)
  vqAbRefreshEffect(player, vqAbEffect('minecraft:resistance'), 30, 1, false)
})
