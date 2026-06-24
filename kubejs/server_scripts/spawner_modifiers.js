ServerEvents.recipes(event => {
  /*
   * FALSE FOR TESTING / TRUE FOR VANILLA
   */
  const REMOVE_DEFAULT_MODIFIERS = true

  if (REMOVE_DEFAULT_MODIFIERS) {
    event.remove({ type: 'apotheosis:spawner_modifier' })
  }

  function addSpawnerModifier(id, sigil, statChanges) {
    event.custom({
      type: 'apotheosis:spawner_modifier',
      mainhand: {
        item: `kubejs:${sigil}`
      },
      consumes_offhand: false,
      stat_changes: statChanges
    }).id(`vanquish:spawner_modifiers/${id}`)
  }

  // -------------------------
  // AMÉLIORATIONS NUMÉRIQUES
  // -------------------------

  addSpawnerModifier(
    'haste',
    'sigil_of_haste',
    [
      {
        id: 'min_delay',
        value: -5,
        min: 100,
        max: 800
      }
    ]
  )

  addSpawnerModifier(
    'acceleration',
    'sigil_of_acceleration',
    [
      {
        id: 'max_delay',
        value: -10,
        min: 100,
        max: 800
      }
    ]
  )

  addSpawnerModifier(
    'abundance',
    'sigil_of_abundance',
    [
      {
        id: 'spawn_count',
        value: 1,
        min: 1,
        max: 8
      }
    ]
  )

  addSpawnerModifier(
    'capacity',
    'sigil_of_capacity',
    [
      {
        id: 'max_nearby_entities',
        value: 2,
        min: 1,
        max: 16
      }
    ]
  )

  addSpawnerModifier(
    'presence',
    'sigil_of_presence',
    [
      {
        id: 'req_player_range',
        value: 4,
        min: 1,
        max: 48
      }
    ]
  )

  addSpawnerModifier(
    'expansion',
    'sigil_of_expansion',
    [
      {
        id: 'spawn_range',
        value: 1,
        min: 1,
        max: 8
      }
    ]
  )

  // -------------------------
  // AMÉLIORATIONS BOOLÉENNES
  // -------------------------

  addSpawnerModifier(
    'autonomy',
    'sigil_of_autonomy',
    [
      {
        id: 'ignore_players',
        value: true
      }
    ]
  )

  addSpawnerModifier(
    'lawlessness',
    'sigil_of_lawlessness',
    [
      {
        id: 'ignore_conditions',
        value: true
      }
    ]
  )

  addSpawnerModifier(
    'control',
    'sigil_of_control',
    [
      {
        id: 'redstone_control',
        value: true
      }
    ]
  )

  addSpawnerModifier(
    'night',
    'sigil_of_night',
    [
      {
        id: 'ignore_light',
        value: true
      }
    ]
  )

  addSpawnerModifier(
    'stasis',
    'sigil_of_stasis',
    [
      {
        id: 'no_ai',
        value: true
      }
    ]
  )

  addSpawnerModifier(
    'silence',
    'sigil_of_silence',
    [
      {
        id: 'silent',
        value: true
      }
    ]
  )
})