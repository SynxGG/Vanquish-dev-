// Vanquish - Goblin tool recycling, Bone Armor and Wither Armor progression

ServerEvents.recipes(event => {
  const WITHER_BONE = 'kubejs:wither_bone'
  const WITHER_DUST = 'kubejs:wither_dust'

  // --------------------------------------------------------------------------
  // Goblins tool recycling
  // --------------------------------------------------------------------------

  const goblinTools = [
    'goblins:goblin_knife',
    'goblins:goblin_axe',
    'goblins:goblin_pickaxe'
  ]

  goblinTools.forEach(tool => {
    const path = tool.split(':')[1]

    event
      .smelting('5x minecraft:iron_nugget', tool)
      .id(`kubejs:vanquish/smelting/${path}_to_iron_nuggets`)
  })

  // --------------------------------------------------------------------------
  // Bone Block
  // Replaces every crafting route to Bone Block, preventing the Bone Meal bypass.
  // The vanilla Bone Block -> 9 Bone Meal recipe is intentionally left untouched.
  // --------------------------------------------------------------------------

  event.remove({ output: 'minecraft:bone_block' })

  event
    .shaped('minecraft:bone_block', [
      'BBB',
      'BBB',
      'BBB'
    ], {
      B: 'minecraft:bone'
    })
    .id('kubejs:vanquish/bone_block_from_bones')

  // --------------------------------------------------------------------------
  // Bone Armor
  // Native Immersive Armors recipes are removed and rebuilt with Bone Blocks.
  // --------------------------------------------------------------------------

  const boneArmor = [
    'immersive_armors:bone_helmet',
    'immersive_armors:bone_chestplate',
    'immersive_armors:bone_leggings',
    'immersive_armors:bone_boots'
  ]

  boneArmor.forEach(output => event.remove({ output: output }))

  event
    .shaped('immersive_armors:bone_helmet', [
      'BBB',
      'B B'
    ], {
      B: 'minecraft:bone_block'
    })
    .id('kubejs:vanquish/armor/bone_helmet')

  event
    .shaped('immersive_armors:bone_chestplate', [
      'B B',
      'BBB',
      'BBB'
    ], {
      B: 'minecraft:bone_block'
    })
    .id('kubejs:vanquish/armor/bone_chestplate')

  event
    .shaped('immersive_armors:bone_leggings', [
      'BBB',
      'B B',
      'B B'
    ], {
      B: 'minecraft:bone_block'
    })
    .id('kubejs:vanquish/armor/bone_leggings')

  event
    .shaped('immersive_armors:bone_boots', [
      'B B',
      'B B'
    ], {
      B: 'minecraft:bone_block'
    })
    .id('kubejs:vanquish/armor/bone_boots')

  // --------------------------------------------------------------------------
  // Wither materials
  // --------------------------------------------------------------------------

  event
    .shapeless(WITHER_DUST, ['minecraft:wither_rose'])
    .id('kubejs:vanquish/wither_dust_from_wither_rose')

  event
    .shaped(`8x ${WITHER_BONE}`, [
      'BBB',
      'BDB',
      'BBB'
    ], {
      B: 'minecraft:bone',
      D: WITHER_DUST
    })
    .id('kubejs:vanquish/wither_bones_from_bones_and_dust')

  // --------------------------------------------------------------------------
  // Wither Armor
  // Rule: preserve the native recipe shape, replace one Nether Brick slot with
  // Wither Dust and every remaining Nether Brick slot with a Wither Bone.
  // Counts:
  // Helmet:    4 Wither Bones + 1 Wither Dust + Bone Helmet
  // Chestplate:6 Wither Bones + 1 Wither Dust + Bone Chestplate
  // Leggings:  5 Wither Bones + 1 Wither Dust + Bone Leggings
  // Boots:     3 Wither Bones + 1 Wither Dust + Bone Boots
  // --------------------------------------------------------------------------

  const witherArmor = [
    'immersive_armors:wither_helmet',
    'immersive_armors:wither_chestplate',
    'immersive_armors:wither_leggings',
    'immersive_armors:wither_boots'
  ]

  witherArmor.forEach(output => event.remove({ output: output }))

  event
    .shaped('immersive_armors:wither_helmet', [
      'DWW',
      'WAW'
    ], {
      D: WITHER_DUST,
      W: WITHER_BONE,
      A: 'immersive_armors:bone_helmet'
    })
    .id('kubejs:vanquish/armor/wither_helmet')

  event
    .shaped('immersive_armors:wither_chestplate', [
      'W W',
      'WAW',
      'WDW'
    ], {
      D: WITHER_DUST,
      W: WITHER_BONE,
      A: 'immersive_armors:bone_chestplate'
    })
    .id('kubejs:vanquish/armor/wither_chestplate')

  event
    .shaped('immersive_armors:wither_leggings', [
      'DAW',
      'W W',
      'W W'
    ], {
      D: WITHER_DUST,
      W: WITHER_BONE,
      A: 'immersive_armors:bone_leggings'
    })
    .id('kubejs:vanquish/armor/wither_leggings')

  event
    .shaped('immersive_armors:wither_boots', [
      'DAW',
      'W W'
    ], {
      D: WITHER_DUST,
      W: WITHER_BONE,
      A: 'immersive_armors:bone_boots'
    })
    .id('kubejs:vanquish/armor/wither_boots')
})
