// Vanquish - Mutant Skeleton Masterful set tooltip
// Vanilla's effect panel does not render arbitrary effect descriptions, so the
// flavour text is shown on each Masterful Mutant Skeleton armor piece.

ItemEvents.tooltip(event => {
  const armor = [
    'mutantmonsters:mutant_skeleton_skull',
    'mutantmonsters:mutant_skeleton_chestplate',
    'mutantmonsters:mutant_skeleton_leggings',
    'mutantmonsters:mutant_skeleton_boots'
  ]

  armor.forEach(id => {
    event.addAdvanced(id, (item, advanced, text) => {
      if (item.nbt == null || Number(item.nbt.tool_quality) != 41) return

      text.add(1, Text.of('Masterful Set Bonus: Aberration').darkPurple().bold(true))
      text.add(2, Text.of('You are an aberration of nature—rotting from within,').gray().italic(true))
      text.add(3, Text.of('yet harboring a terrible power.').gray().italic(true))
    })
  })
})
