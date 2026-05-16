const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const { verifyToken } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

router.post('/sync', calendarController.syncEvents);
router.post('/', calendarController.addEvent);
router.get('/me', calendarController.getMyEvents);
router.post('/recover', calendarController.generateRecoveryBreaks);
router.delete('/events/:eventId', calendarController.deleteEvent);

module.exports = router;
