// ============================================================
// VANQUISH — GRUE BALANCE
// ============================================================

const $Attributes = Java.loadClass(
  'net.minecraft.world.entity.ai.attributes.Attributes'
)

const VQ_GRUE_ID = 'grue_remake:grue'
const VQ_GRUE_ATTACK_DAMAGE = 14

function applyVanquishGrueDamage(grue) {
  const attackAttribute = grue.getAttribute($Attributes.ATTACK_DAMAGE)

  if (attackAttribute !== null) {
    attackAttribute.setBaseValue(VQ_GRUE_ATTACK_DAMAGE)
  }
}

// ------------------------------------------------------------
// ATTACK DMG
// ------------------------------------------------------------

EntityEvents.spawned(event => {
  const grue = event.entity

  if (grue.type !== VQ_GRUE_ID) return


  applyVanquishGrueDamage(grue)


  event.server.scheduleInTicks(20, () => {
    if (grue.isAlive()) {
      applyVanquishGrueDamage(grue)
    }
  })

  console.info(
    `[Vanquish] Grue réglée à ${VQ_GRUE_ATTACK_DAMAGE} dégâts`
  )
})

// ------------------------------------------------------------
// BOAT TRAP
// ------------------------------------------------------------

let vqGrueVehicleTimer = 0

ServerEvents.tick(event => {
  vqGrueVehicleTimer++

  if (vqGrueVehicleTimer < 10) return
  vqGrueVehicleTimer = 0

  event.server.runCommandSilent(
    `execute as @e[type=${VQ_GRUE_ID}] run ride @s dismount`
  )
})