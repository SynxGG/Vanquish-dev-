ServerEvents.recipes(event => {
  const addDecraft = (id, output, input) => {
    event
      .shapeless(output, [input])
      .id(`kubejs:vanquish/decraft/${id}`)
  }

  // Wooden Armor
  addDecraft(
    'wooden_helmet',
    '6x minecraft:stick',
    'immersive_armors:wooden_helmet'
  )

  addDecraft(
    'wooden_chestplate',
    '10x minecraft:stick',
    'immersive_armors:wooden_chestplate'
  )

  addDecraft(
    'wooden_leggings',
    '10x minecraft:stick',
    'immersive_armors:wooden_leggings'
  )

  addDecraft(
    'wooden_boots',
    '6x minecraft:stick',
    'immersive_armors:wooden_boots'
  )

  // Bone Armor
  addDecraft(
    'bone_helmet',
    'minecraft:bone',
    'immersive_armors:bone_helmet'
  )

  addDecraft(
    'bone_chestplate',
    '2x minecraft:bone',
    'immersive_armors:bone_chestplate'
  )

  addDecraft(
    'bone_leggings',
    '2x minecraft:bone',
    'immersive_armors:bone_leggings'
  )

  addDecraft(
    'bone_boots',
    'minecraft:bone',
    'immersive_armors:bone_boots'
  )
})