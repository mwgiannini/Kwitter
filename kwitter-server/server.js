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

// Route to get a users profile picture
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

// Route to favorite/unfavorite a post
app.get("/api/favorite/:props", (req,res)=>{
    const props = req.params.props;
     db.query(`CALL toggle_favorite(${props.username}, ${props.post_time}, ${props.favorite_username})`, 
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
    const data = JSON.parse(req.params.info);
     db.query(`SELECT password FROM user WHERE username = '${data.username}';`,
     (err,result)=>{
        if(err) {
        console.log(err)
        data.status = 400;
        data.body = {loggedIn: false, message:'network error'}
        }
        if (result[0].password === data.password){
            console.log(`${data.username} has logged in`)
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

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})