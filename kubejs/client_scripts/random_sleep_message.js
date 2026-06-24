// kubejs/client_scripts/random_sleep_message.js

// Chaque rêve contient exactement trois lignes courtes.
// Le poids définit sa fréquence relative d'apparition.

const SLEEP_MESSAGES = [
  // Rêves communs : destinée, mémoire et ascension
  {
    weight: 12,
    lines: [
      "You dream of a river of stars",
      "climbing toward a silent mountain.",
      "Its waters whisper your name."
    ]
  },
  {
    weight: 12,
    lines: [
      "Beyond a ruined temple,",
      "a marble statue bears your face.",
      "You do not remember posing for it."
    ]
  },
  {
    weight: 11,
    lines: [
      "Three veiled women draw a golden thread",
      "from the depths of your heart.",
      "Their scissors hesitate."
    ]
  },
  {
    weight: 11,
    lines: [
      "You stand in a hall of twelve thrones.",
      "One seat remains empty.",
      "The stone is still warm."
    ]
  },
  {
    weight: 10,
    lines: [
      "An eagle circles above the clouds.",
      "It drops a spark into your chest.",
      "You wake before the fire spreads."
    ]
  },
  {
    weight: 10,
    lines: [
      "You walk beneath ancient olive trees.",
      "Their roots rise from the earth",
      "and reach upward into the heavens."
    ]
  },
  {
    weight: 10,
    lines: [
      "A crown of laurel closes around your brow.",
      "Its leaves draw blood.",
      "The blood smells faintly of ambrosia."
    ]
  },
  {
    weight: 9,
    lines: [
      "You return to a familiar hearth.",
      "The faces around it blur like smoke,",
      "but the flame bends toward you."
    ]
  },
  {
    weight: 9,
    lines: [
      "You cross a field of broken bronze.",
      "Your shadow walks ahead of you,",
      "taller than any mortal."
    ]
  },
  {
    weight: 9,
    lines: [
      "You lie in a meadow without wind.",
      "One by one, every flower turns",
      "to face you."
    ]
  },

  // Rêves plus inquiétants
  {
    weight: 7,
    lines: [
      "You stand beside a black river.",
      "The ferryman refuses your coin.",
      "\"Your road does not end here.\""
    ]
  },
  {
    weight: 7,
    lines: [
      "A cold spear passes through your chest.",
      "You feel no pain.",
      "Only the anger of being interrupted."
    ]
  },
  {
    weight: 6,
    lines: [
      "The shades of the dead whisper",
      "the name you carried as a mortal.",
      "Another voice calls you by a new title."
    ]
  },
  {
    weight: 6,
    lines: [
      "Deep beneath a mountain,",
      "something vast turns in its sleep.",
      "The stones tremble. You do not."
    ]
  },
  {
    weight: 6,
    lines: [
      "You raise a bronze shield to the storm.",
      "Lightning strikes its surface.",
      "When the glare fades, you remain."
    ]
  },

  // Présages rares
  {
    weight: 3,
    lines: [
      "You climb the steps of Olympus.",
      "The laughter of the gods falls silent.",
      "A golden cup waits at your place."
    ]
  },
  {
    weight: 3,
    lines: [
      "The sea becomes smooth as polished glass.",
      "Far below, a colossal shadow stirs.",
      "For a moment, the waters bow."
    ]
  },
  {
    weight: 3,
    lines: [
      "Behind gates of tarnished bronze,",
      "a living storm strains against its chains.",
      "One link breaks when you speak."
    ]
  },
  {
    weight: 2,
    lines: [
      "Above a sea of clouds,",
      "a hand larger than a city rises",
      "and grips the edge of the world."
    ]
  },
  {
    weight: 2,
    lines: [
      "You kneel before a faceless king.",
      "\"Mortality is a garment,\" he says.",
      "\"Soon, you will outgrow it.\""
    ]
  },

  // Rêves rares plus légers
  {
    weight: 2,
    lines: [
      "At a divine banquet,",
      "you ignore the ambrosia and take bread.",
      "The gods pretend not to notice."
    ]
  },
  {
    weight: 1,
    lines: [
      "A satyr offers you a prophecy.",
      "You listen carefully.",
      "It is only a very long drinking song."
    ]
  }
]

let wasSleeping = false

function chooseWeightedDream() {
  let totalWeight = 0

  SLEEP_MESSAGES.forEach(dream => {
    totalWeight += dream.weight
  })

  let roll = Math.random() * totalWeight

  for (const dream of SLEEP_MESSAGES) {
    roll -= dream.weight

    if (roll <= 0) {
      return dream.lines
    }
  }

  return SLEEP_MESSAGES[0].lines
}

ClientEvents.tick(event => {
  const player = Client.player

  if (!player) {
    return
  }

  const isSleeping = player.isSleeping()

  // Le joueur vient de s'endormir :
  // sélectionner un seul rêve pour toute l'animation.
  if (isSleeping && !wasSleeping) {
    const lines = chooseWeightedDream()

    player.paint({
      random_sleep_line_1: {
        type: "text",
        text: lines[0],
        x: 0,
        y: -16,
        alignX: "center",
        alignY: "center",
        centered: true,
        shadow: true,
        scale: 0.95,
        draw: "always",
        visible: true
      },

      random_sleep_line_2: {
        type: "text",
        text: lines[1],
        x: 0,
        y: 0,
        alignX: "center",
        alignY: "center",
        centered: true,
        shadow: true,
        scale: 0.95,
        draw: "always",
        visible: true
      },

      random_sleep_line_3: {
        type: "text",
        text: lines[2],
        x: 0,
        y: 16,
        alignX: "center",
        alignY: "center",
        centered: true,
        shadow: true,
        scale: 0.95,
        draw: "always",
        visible: true
      }
    })
  }

  // Masquer toutes les lignes au réveil.
  if (!isSleeping && wasSleeping) {
    player.paint({
      random_sleep_line_1: {
        visible: false
      },

      random_sleep_line_2: {
        visible: false
      },

      random_sleep_line_3: {
        visible: false
      }
    })
  }

  wasSleeping = isSleeping
})