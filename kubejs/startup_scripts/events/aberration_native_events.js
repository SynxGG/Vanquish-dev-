// Vanquish - Aberration native mechanics
//
// - Denies Majrusz Bleeding while Aberration is active.
// - Applies a 40% incoming-damage reduction, matching Resistance II.
// - Does not create additional MobEffect instances.

const VQ_AB_ForgeRegistries = Java.loadClass(
  'net.minecraftforge.registries.ForgeRegistries'
)
const VQ_AB_ResourceLocation = Java.loadClass(
  'net.minecraft.resources.ResourceLocation'
)
const VQ_AB_EventResult = Java.loadClass(
  'net.minecraftforge.eventbus.api.Event$Result'
)
const VQ_AB_DamageTypeTags = Java.loadClass(
  'net.minecraft.tags.DamageTypeTags'
)

function vqAbEffect(effectId) {
  return VQ_AB_ForgeRegistries.MOB_EFFECTS.getValue(
    new VQ_AB_ResourceLocation(effectId)
  )
}

function vqAbHasAberration(entity) {
  const effect = vqAbEffect('kubejs:aberration')
  return effect != null && entity.hasEffect(effect)
}

ForgeEvents.onEvent(
  'net.minecraftforge.event.entity.living.MobEffectEvent$Applicable',
  event => {
    const entity = event.getEntity()
    const instance = event.getEffectInstance()

    if (instance == null || !vqAbHasAberration(entity)) {
      return
    }

    const incomingId = VQ_AB_ForgeRegistries.MOB_EFFECTS.getKey(
      instance.getEffect()
    )

    if (
      incomingId != null &&
      String(incomingId) === 'majruszsdifficulty:bleeding'
    ) {
      event.setResult(VQ_AB_EventResult.DENY)
    }
  }
)

ForgeEvents.onEvent(
  'net.minecraftforge.event.entity.living.LivingHurtEvent',
  event => {
    const entity = event.getEntity()

    if (!vqAbHasAberration(entity)) {
      return
    }

    // Match vanilla Resistance behavior: sources explicitly bypassing
    // resistance are not reduced.
    if (
      event.getSource().is(
        VQ_AB_DamageTypeTags.BYPASSES_RESISTANCE
      )
    ) {
      return
    }

    // Resistance II = 40% reduction.
    event.setAmount(event.getAmount() * 0.60)
  }
)
