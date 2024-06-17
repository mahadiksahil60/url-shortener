import express from 'express'
import  {generateNewShortUrl, getanalytics}  from '../controllers/url.js'


const router = express.Router();
router.post('/', generateNewShortUrl);
router.get('/analytics/:shortID', getanalytics)

export default router