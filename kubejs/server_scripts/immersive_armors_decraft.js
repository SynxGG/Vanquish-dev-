// Vanquish - Immersive Armors decrafting
// This file REPLACES the existing immersive_armors_decraft.js.

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

  // Bone Armor - Vanquish total uncraft values
  addDecraft(
    'bone_helmet',
    '6x minecraft:bone',
    'immersive_armors:bone_helmet'
  )

  addDecraft(
    'bone_chestplate',
    '9x minecraft:bone',
    'immersive_armors:bone_chestplate'
  )

  addDecraft(
    'bone_leggings',
    '8x minecraft:bone',
    'immersive_armors:bone_leggings'
  )

  addDecraft(
    'bone_boots',
    '5x minecraft:bone',
    'immersive_armors:bone_boots'
  )
})
