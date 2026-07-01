// Vanquish - Mutant Skeleton Masterful set flavour tooltip
// The purple "Masterful Set Bonus" title was intentionally removed.

ItemEvents.tooltip(event => {
  const armor = [
    'mutantmonsters:mutant_skeleton_skull',
    'mutantmonsters:mutant_skeleton_chestplate',
    'mutantmonsters:mutant_skeleton_leggings',
    'mutantmonsters:mutant_skeleton_boots'
  ]

  armor.forEach(id => {
    event.addAdvanced(id, (item, advanced, text) => {
      if (item.nbt == null || Number(item.nbt.tool_quality) !== 41) return

      // Preserve the wording currently published in the Vanquish repository.
      text.add(1, Text.of('You are an aberration of nature—rotting from within,').gray().italic(true))
      text.add(2, Text.of('yet harboring a terrible power.').gray().italic(true))
    })
  })
})
