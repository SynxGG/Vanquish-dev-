ServerEvents.recipes(event => {
  /*
   * Vérifie les IDs Aquaculture avec /kjs hand.
   * Remplace les valeurs ci-dessous si ton instance utilise un autre identifiant.
   */

  const NEPTUNIUM = 'aquaculture:neptunium_ingot'

  // Premier sigil marin :
  // augmente la distance à laquelle le joueur active le spawner.
  event.shaped('kubejs:sigil_of_presence', [
    'PCP',
    'NIN',
    'PCP'
  ], {
    P: 'minecraft:prismarine_shard',
    C: 'minecraft:prismarine_crystals',
    N: 'minecraft:nautilus_shell',
    I: NEPTUNIUM
  }).id('vanquish:sigils/presence')

  // Sigil Aquaculture intermédiaire :
  // augmente le nombre maximal de mobs proches autorisés.
  event.shaped('kubejs:sigil_of_capacity', [
    'SPS',
    'NIN',
    'SPS'
  ], {
    S: 'minecraft:sponge',
    P: 'minecraft:prismarine_crystals',
    N: 'minecraft:nautilus_shell',
    I: NEPTUNIUM
  }).id('vanquish:sigils/capacity')

  // Sigil marin avancé :
  // agrandit la zone dans laquelle les mobs apparaissent.
  event.shaped('kubejs:sigil_of_expansion', [
    'HSH',
    'NIN',
    'HSH'
  ], {
    H: 'minecraft:heart_of_the_sea',
    S: 'minecraft:prismarine_shard',
    N: 'minecraft:nautilus_shell',
    I: NEPTUNIUM
  }).id('vanquish:sigils/expansion')
})