// Vanquish - Aberration
// Visible facade effect for the fully Masterful Mutant Skeleton armor set.
// The internal effects are applied invisibly by the server script.
// Full game restart required after changing this startup script.

StartupEvents.registry('mob_effect', event => {
  event.create('aberration')
    .beneficial()
    .color(0x6A3B78)
})
