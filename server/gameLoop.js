// server/gameLoop.js
const { Settlement } = require('./models/init');
const TICK_INTERVAL = 1000; // 1 second

/**
 * Update a settlement's resources based on the time passed since its last update.
 */
async function updateSettlement(settlement) {
  const now = Date.now();
  const lastUpdate = settlement.details.lastUpdate || now;
  const secondsPassed = Math.floor((now - lastUpdate) / 1000);
  if (secondsPassed <= 0) return;

  const productionRate = settlement.details.production || { wood: 5, stone: 3, food: 4 };
  settlement.details.resources = settlement.details.resources || {};

  for (let resource in productionRate) {
    settlement.details.resources[resource] = (settlement.details.resources[resource] || 0) + (productionRate[resource] * secondsPassed);
  }

  settlement.details.lastUpdate = now;
  await settlement.save();
  console.log(`Settlement "${settlement.name}" updated for ${secondsPassed} seconds.`);
}

/**
 * Main game loop: updates settlements belonging only to active players.
 */
async function gameLoop() {
  try {
    // Check if there are any active players before querying the database
    if (!global.activePlayerIds || global.activePlayerIds.size === 0) {
      console.log('Game loop: no active players, skipping update.');
      return;
    }

    const settlements = await Settlement.findAll();
    console.log(`Game loop: found ${settlements.length} settlements.`);
    
    for (const settlement of settlements) {
      const playerId = settlement.playerId;
      if (global.activePlayerIds.has(playerId)) {
         console.log(`Updating settlement "${settlement.name}" (playerId: ${playerId})`);
         await updateSettlement(settlement);
      } else {
         console.log(`Skipping settlement "${settlement.name}" (playerId: ${playerId}) - not active.`);
      }
    }
  } catch (error) {
    console.error("Error in game loop:", error);
  }
}

/**
 * Start the game loop.
 */
function startGameLoop(io) {
  setInterval(gameLoop, TICK_INTERVAL);
  // Optionally, use the io instance to emit updates to clients here.
}

module.exports = startGameLoop;
