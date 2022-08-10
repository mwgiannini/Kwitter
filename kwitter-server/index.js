const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get a users timeline
app.get("/api/getTimeline/:username", (req,res)=>{
    const username = req.params.username;
     db.query("CALL timeline(?)", username, 
     (err,result)=>{
        if(err) {
        console.log(err)
        } 
        res.send(result)
        });   
});