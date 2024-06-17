import { nanoid } from 'nanoid';
import URL from '../models/url.js'


async function generateNewShortUrl(req, res){
    const body = req.body;
    if(!body.URL) return res.status(400).json("NO URL FOUND ... ")
    
    
    const shortID = nanoid(8);
    console.log(shortID)
    await URL.create({
        shortID :shortID,
        redirectUrl: body.URL,
        visitedHistory: [],
    })

    return res.json({ shortID })
}

async function getanalytics(req, res){
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID});
    res.json({
        totalClicks: result.visitedHistory.length,
        analytics : result.visitedHistory
    })
}

export  {generateNewShortUrl, getanalytics};