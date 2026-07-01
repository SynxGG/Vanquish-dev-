// Vanquish - Aberration
// Visible facade for the fully Masterful Mutant Skeleton armor set.
// Real component MobEffects are applied invisibly by the server script.

StartupEvents.registry('mob_effect', event => {
  event.create('aberration')
    .beneficial()
    .color(0x6A3B78)
})
