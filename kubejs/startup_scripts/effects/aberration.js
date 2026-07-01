// Vanquish - Aberration
// Visible facade for the fully Masterful Mutant Skeleton armor set.
// Component effects are applied invisibly by the server script.
// Full game restart required after changing this registry script.

StartupEvents.registry('mob_effect', event => {
  event.create('aberration')
    .beneficial()
    .color(0x6A3B78)
})
