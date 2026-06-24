PlayerEvents.tick(event => {
  const player = event.player

  // Une fois par seconde, pas besoin de spam chaque tick
  if (player.age % 20 !== 0) return

  const WROUGHT_AXE = 'mowziesmobs:wrought_axe'

  const main = player.mainHandItem
  const off = player.offHandItem

  const holdingAxe =
    main.id === WROUGHT_AXE ||
    off.id === WROUGHT_AXE

  if (!holdingAxe) return

  // Slowness I pendant 2 secondes, refresh chaque seconde
  player.potionEffects.add('minecraft:slowness', 40, 1, false, false)
})