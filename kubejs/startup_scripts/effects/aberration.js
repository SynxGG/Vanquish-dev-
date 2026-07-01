// Vanquish - Aberration
// Single visible effect for the fully Masterful Mutant Skeleton armor set.
// All mechanics are implemented directly by this effect or by Forge events;
// no component potion effects are applied to the player.

StartupEvents.registry('mob_effect', event => {
  event.create('aberration')
    .beneficial()
    .color(0x6A3B78)

    // Equivalent to Unluck I.
    .modifyAttribute(
      'minecraft:generic.luck',
      '0d2d8c5c-4f44-4e9c-9f03-8dcd1e8fb201',
      -1.0,
      'addition'
    )

    // Equivalent to Quark Resilience II: +100% knockback resistance.
    .modifyAttribute(
      'minecraft:generic.knockback_resistance',
      'b23e2f5a-15be-4f11-8b6b-89bca95f7c33',
      1.0,
      'addition'
    )

    // Equivalent to Hunger I: +0.005 exhaustion every tick.
    .effectTick((entity, amplifier) => {
      // Aberration is only granted to players by the set controller.
      entity.getFoodData().addExhaustion(0.005)
    })
})
