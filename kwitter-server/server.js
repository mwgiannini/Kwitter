const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 10001;
app.use(cors());
app.use(express.json())

let data = {
    status : Number,
    body : any=null
}

// Route to get a users timeline
app.get("/api/getTimeline/:username", (req,res)=>{
    const username = req.params.username;
     db.query("CALL timeline(?)", username, 
     (err,result)=>{
        if(err) {
        console.log(err)
        data.status = 400
        }
        else { data.status = 200 }
        data.body = result
        res.send(data)
        });   
});

// Route to get a users timeline
app.get("/api/getProfilePicture/:username", (req,res)=>{
    const username = req.params.username;
     db.query("SELECT profile_pic FROM user WHERE username=?", username, 
     (err,result)=>{
        if(err) {
        console.log(err)
        data.status = 400
        }
        else { data.status = 200 }
        data.body = result
        res.send(data)
        });   
});


// Route to login
app.get("/api/login/:info", (req,res)=>{
    const request = JSON.parse(req.params.info);
     db.query(`SELECT password FROM user WHERE username = '${request.username}';`,
     (err,result)=>{
        if(err) {
        console.log(err)
        data.status = 400;
        data.body = {loggedIn: false, message:'network error'}
        }
        if (result[0].password === request.password){
            console.log(`${request.username} has logged in`)
            data.status = 200
            data.body = {loggedIn: true, message:''}
        }
        else {
            data.status = 200;
            data.body = {loggedIn: false, message:'wrong password'}
        }
        res.send(JSON.stringify(data))
        });   
});


// Route to login
app.get("/api/getUsers/:info", (req,res)=>{
    const request = JSON.parse(req.params.info);
    let query;
    if (request.request == 'follower'){
        query = `SELECT follower FROM follow WHERE following = '${request.user}';`
    }
    else {
        query = `SELECT following FROM follow WHERE follower = '${request.user}';`
    }
    console.log(query)
     db.query(query,
     (err,result)=>{
        if(err) {
        console.log(err)
        data.status = 400;
        data.body = {message:'network error'}
        }
        else {
            data.status = 200;
            data.body = {result}
        }
        console.log(JSON.stringify(data))
        res.send(JSON.stringify(data))
        });   
});


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})