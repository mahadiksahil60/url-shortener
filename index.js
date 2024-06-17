import express from 'express'
import urlroute from './routes/url.js';
import connectMongoDb from './connect.js';
import URL from './models/url.js'
import path from 'path'
const app = express();
const PORT = 4000; 
const DATABASE_NAME = "short-url"

connectMongoDb(`mongodb+srv://mahadiksahil60:sahil123@cluster0.9ikbkik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${DATABASE_NAME}`)
.then(()=>{console.log("Database connected successfully")})
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use("/url", urlroute);
app.get('/url/:shortID', async ( req, res)=>{
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID,

    },{
        $push : {
            visitedHistory  : { 
                timestamp: Date.now()
            }
        }
    });
    res.redirect(entry.redirectUrl)
})

app.get("/test", async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,

    });
})


app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})