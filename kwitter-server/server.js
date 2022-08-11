const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 10001;
app.use(cors());
app.use(express.json())

let answer = {
    status : null,
    data : null
}

// Route to get a users timeline
app.get("/api/getTimeline/:username", (req,res)=>{
    const username = req.params.username;
     db.query("CALL timeline(?)", username, 
     (err,result)=>{
        if(err) {
        console.log(err)
        answer.status = 400
        }
        else { answer.status = 200 }
        answer.data = result
        res.send(answer)
        });   
});


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})