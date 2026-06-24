StartupEvents.registry('item', event => {
  const sigils = [
    ['sigil_of_silence', 'Sigil of Silence'],
    ['sigil_of_control', 'Sigil of Control'],
    ['sigil_of_youth', 'Sigil of Youth'],
    ['sigil_of_night', 'Sigil of Night'],
    ['sigil_of_capacity', 'Sigil of Capacity'],
    ['sigil_of_abundance', 'Sigil of Abundance'],
    ['sigil_of_presence', 'Sigil of Presence'],
    ['sigil_of_expansion', 'Sigil of Expansion'],
    ['sigil_of_stasis', 'Sigil of Stasis'],
    ['sigil_of_lawlessness', 'Sigil of Lawlessness'],
    ['sigil_of_haste', 'Sigil of Haste'],
    ['sigil_of_acceleration', 'Sigil of Acceleration'],
    ['sigil_of_autonomy', 'Sigil of Autonomy'],
    ['sigil_of_reversal', 'Sigil of Reversal']
  ]

  sigils.forEach(([id, displayName]) => {
    event
      .create(id)
      .displayName(displayName)
      .maxStackSize(16)
  })
})