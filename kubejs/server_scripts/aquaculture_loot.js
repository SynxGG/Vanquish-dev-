// ============================================================
// VANQUISH — AQUACULTURE SIGILS
// Ajouts externes : aucune modification du .jar Aquaculture.
// ============================================================

function giveRandomSigil(event, chance, sigilId) {
  if (Math.random() < chance) {
    event.player.give(sigilId)
  }
}

// ------------------------------------------------------------
// BOX
// Faible chance d'obtenir le Sigil of Presence.
// ------------------------------------------------------------

ItemEvents.rightClicked('aquaculture:box', event => {
  giveRandomSigil(event, 0.01, 'kubejs:sigil_of_presence')
})

// ------------------------------------------------------------
// LOCKBOX
// Faible chance d'obtenir le Sigil of Capacity.
// ------------------------------------------------------------

ItemEvents.rightClicked('aquaculture:lockbox', event => {
  giveRandomSigil(event, 0.02, 'kubejs:sigil_of_capacity')
})

// ------------------------------------------------------------
// TREASURE CHEST
// Chance supérieure d'obtenir le Sigil of Capacity.
// ------------------------------------------------------------

ItemEvents.rightClicked('aquaculture:treasure_chest', event => {
  giveRandomSigil(event, 0.08, 'kubejs:sigil_of_capacity')
})