// server/routes/api.js
const express = require('express');
const router = express.Router();

// Import models from the initializer (using init.js)
const { User, Player, Subject, Settlement, Faction, Party } = require('../models/init');

/* =========================================
   STATS ENDPOINT
========================================= */
// GET /api/v1/stats - Return counts for various models
router.get('/stats', async (req, res) => {
    try {
      const userCount = await User.count();
      const playerCount = await Player.count();
      const subjectCount = await Subject.count();
      const settlementCount = await Settlement.count();
      const factionCount = await Faction.count();
      const partyCount = await Party.count();

      // Calculate active players from the global activePlayerIds set.
      // Ensure that global.activePlayerIds exists.
      const activePlayerCount = global.activePlayerIds ? global.activePlayerIds.size : 0;
  
      res.json({
        users: userCount,
        players: playerCount,
        subjects: subjectCount,
        settlements: settlementCount,
        factions: factionCount,
        parties: partyCount,
        activePlayers: activePlayerCount
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

/* =========================================
   USERS API
========================================= */
// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET single user by id
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

/* =========================================
   PLAYERS API
========================================= */
// GET all players
router.get('/players', async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

// GET single player by id
router.get('/players/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json(player);
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ error: 'Failed to fetch player' });
  }
});

/* =========================================
   SUBJECTS API
========================================= */
// GET all subjects
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

// GET single subject by id
router.get('/subjects/:id', async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).json({ error: 'Failed to fetch subject' });
  }
});

/* =========================================
   SETTLEMENTS API
========================================= */
// GET all settlements
router.get('/settlements', async (req, res) => {
  try {
    const settlements = await Settlement.findAll();
    res.json(settlements);
  } catch (error) {
    console.error('Error fetching settlements:', error);
    res.status(500).json({ error: 'Failed to fetch settlements' });
  }
});

// GET single settlement by id
router.get('/settlements/:id', async (req, res) => {
  try {
    const settlement = await Settlement.findByPk(req.params.id);
    if (!settlement) return res.status(404).json({ error: 'Settlement not found' });
    res.json(settlement);
  } catch (error) {
    console.error('Error fetching settlement:', error);
    res.status(500).json({ error: 'Failed to fetch settlement' });
  }
});

/* =========================================
   FACTIONS API
========================================= */
// GET all factions
router.get('/factions', async (req, res) => {
  try {
    const factions = await Faction.findAll();
    res.json(factions);
  } catch (error) {
    console.error('Error fetching factions:', error);
    res.status(500).json({ error: 'Failed to fetch factions' });
  }
});

// GET single faction by id
router.get('/factions/:id', async (req, res) => {
  try {
    const faction = await Faction.findByPk(req.params.id);
    if (!faction) return res.status(404).json({ error: 'Faction not found' });
    res.json(faction);
  } catch (error) {
    console.error('Error fetching faction:', error);
    res.status(500).json({ error: 'Failed to fetch faction' });
  }
});

/* =========================================
   PARTIES API
========================================= */
// GET all parties
router.get('/parties', async (req, res) => {
  try {
    const parties = await Party.findAll();
    res.json(parties);
  } catch (error) {
    console.error('Error fetching parties:', error);
    res.status(500).json({ error: 'Failed to fetch parties' });
  }
});

// GET single party by id
router.get('/parties/:id', async (req, res) => {
  try {
    const party = await Party.findByPk(req.params.id);
    if (!party) return res.status(404).json({ error: 'Party not found' });
    res.json(party);
  } catch (error) {
    console.error('Error fetching party:', error);
    res.status(500).json({ error: 'Failed to fetch party' });
  }
});

module.exports = router;
