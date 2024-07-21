import express from 'express';
import { getNews } from '../controllers/news.js';
import { summarizeAI } from '../controllers/summarize-ai.js';
const router = express.Router();

router.route("/news").get(getNews);
router.route("/summarize").get(summarizeAI);

export default router;