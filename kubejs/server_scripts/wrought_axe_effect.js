PlayerEvents.tick(event => {
  const player = event.player

  // 1x/sec, no tick spam
  if (player.age % 20 !== 0) return

  const WROUGHT_AXE = 'mowziesmobs:wrought_axe'

  const main = player.mainHandItem
  const off = player.offHandItem

  const holdingAxe =
    main.id === WROUGHT_AXE ||
    off.id === WROUGHT_AXE

  if (!holdingAxe) return

  // Slowness II for 2 sec, refresh every sec
  player.potionEffects.add('minecraft:slowness', 40, 1, false, false)
})