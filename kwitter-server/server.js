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



// Route to login
app.get("/api/login/:info", (req,res)=>{
    const data = JSON.parse(req.params.info);
    let reply = {status: Number, info: any = ''}
     db.query(`SELECT password FROM user WHERE username = '${data.username}';`,
     (err,result)=>{
        if(err) {
        console.log(err)
        reply.status = 400;
        reply.info = {loggedIn: false, message:'network error'}
        }
        console.log('result' + result[0].password);
        console.log('request' + data.password);
        if (result[0].password === data.password){
            console.log("correct")
            reply.status = 200
            reply.info = {loggedIn: true, message:''}
        }
        else {
            reply.status = 200;
            reply.info = {loggedIn: false, message:'wrong password'}
        }
        res.send(JSON.stringify(reply))
        });   
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})