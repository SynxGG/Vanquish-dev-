 // ============================================================
// VANQUISH — WORKSTATION RECIPE
//
// S = Soulforged Alloy
// N = Neptunium Ingot
// C = Crafting Table
// ============================================================

ServerEvents.recipes(event => {
  const WORKSTATION = 'vanquishmixin:workstation_block'

  // Sécurité contre toute recette générée ou ajoutée ailleurs.
  event.remove({ output: WORKSTATION })

  event.shaped(
    Item.of(WORKSTATION),
    [
      'SNS',
      'NCN',
      'SNS'
    ],
    {
      S: 'kubejs:soulforged_alloy',
      N: 'aquaculture:neptunium_ingot',
      C: 'minecraft:crafting_table'
    }
  ).id('vanquish:workstation')
})