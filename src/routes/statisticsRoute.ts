import express from 'express';
import {
  getBarCharts,
  getDashboardStats,
  getLineCharts,
  getPieCharts,
} from '../controllers/statisticsController.js';
import { adminOnly, loggedInOnly } from '../middlewares/auth.js';

const router = express.Router();

//route - /api/v1/dashboard/stats
router.get('/stats', loggedInOnly, adminOnly, getDashboardStats);
/*
//route - /api/v1/dashboard/pie
router.get('/pie', loggedInOnly, adminOnly, getPieCharts);

//route - /api/v1/dashboard/bar
router.get('/bar', loggedInOnly, adminOnly, getBarCharts);

//route - /api/v1/dashboard/line
router.get('/line', loggedInOnly, adminOnly, getLineCharts);
*/

//route - /api/v1/dashboard/pie
router.get('/pie', getPieCharts);

//route - /api/v1/dashboard/bar
router.get('/bar', getBarCharts);

//route - /api/v1/dashboard/line
router.get('/line', getLineCharts);

export default router;
