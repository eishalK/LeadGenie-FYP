const express = require('express');
const router = express.Router();
const { handleGenerateCampaign } = require('../controllers/campaignController');

router.post('/generate-insights', handleGenerateCampaign);

module.exports = router;