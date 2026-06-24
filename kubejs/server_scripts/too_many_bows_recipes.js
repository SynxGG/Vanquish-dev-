ServerEvents.recipes(event => {
  // Suppression de toutes les recettes natives du mod.
  event.remove({ mod: 'too_many_bows' })

  // Iron Stick
  // Une seule recette couvre automatiquement toutes les positions verticales.
  event
    .shaped('1x kubejs:iron_stick', [
      'I',
      'I'
    ], {
      I: 'minecraft:iron_ingot'
    })
    .id('kubejs:vanquish/materials/iron_stick')

  // Hunter's Bow
  event
    .shaped('too_many_bows:hunter_bow', [
      'LLL',
      'LBL',
      'LLL'
    ], {
      L: 'minecraft:leather',
      B: 'minecraft:bow'
    })
    .id('kubejs:vanquish/too_many_bows/hunter_bow')

  // Emerald Bow — composant inutilisable
  event
    .shaped('kubejs:emerald_bow', [
      ' IS',
      'E S',
      ' IS'
    ], {
      I: 'kubejs:iron_stick',
      E: 'minecraft:emerald_block',
      S: 'minecraft:string'
    })
    .id('kubejs:vanquish/too_many_bows/emerald_bow')

  // Emerald Sage Bow
  event
    .shaped('too_many_bows:emerald_sage_bow', [
      'XXX',
      'XBX',
      'XXX'
    ], {
      X: 'minecraft:experience_bottle',
      B: 'kubejs:emerald_bow'
    })
    .id('kubejs:vanquish/too_many_bows/emerald_sage_bow')
})