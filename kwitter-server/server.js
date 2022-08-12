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

function fixTimesIn(kweetList){
    let fixTime = (time) => {
        let parse = JSON.stringify(time).split('T')
        return (parse[0] + " " + parse[1].split('.')[0]).substring(1)
    }
    for(const kweet of kweetList){
        if ('post_time' in kweet){
            kweet.post_time = fixTime(kweet.post_time)
        }
        if ('rekweet_time' in kweet){
            kweet.rekweet_time = fixTime(kweet.rekweet_time)
        }
    }
}

// Route to get a users timeline
app.get("/api/getTimeline/:username", (req,res)=>{
    const username = req.params.username;
     db.query("CALL timeline(?)", username, 
     (err,result)=>{
        fixTimesIn(result[0])
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
app.get("/api/favorite/:info", (req,res)=>{
    const props = JSON.parse(req.params.info);
     db.query(`CALL toggle_favorite('${props.username}', '${props.post_time}', '${props.favorite_username}')`, 
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

// Route to sign up
app.get("/api/signUp/:info", (req,res)=>{
    const request = JSON.parse(req.params.info);
    console.log(`INSERT INTO user (username, password) VALUES('${request.username}','${request.password}');`)
     db.query(`INSERT INTO user (username, password) VALUES('${request.username}','${request.password}');`,
     (err,result)=>{
        if(err) {
        console.log(err)
        data.status = 400;
        data.body = {message:err.sqlMessage}
        }
        else {
            data.status = 200;
        }
        res.send(JSON.stringify(data))
        });   
});

// Route to get users
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

// Route to get a users favorites
app.get("/api/getFavorites/:username", (req,res)=>{
    const username = req.params.username;
    let query = 
    `SELECT username, post_time, message, favorite_username FROM favorite
    JOIN kweet
    ON
    kweet_username = username
    AND
    kweet_post_time = post_time
    AND favorite_username = '${username}';`
     db.query(query, 
     (err,result)=>{
        fixTimesIn(result)
        if(err) {
        console.log(err)
        data.status = 400
        }
        else { data.status = 200 }
        data.body = result
        res.send(data)
        });   
});

// Route to get a users kweets
app.get("/api/getUserKweets/:username", (req,res)=>{
    const username = req.params.username;
    let query = 
    `SELECT * FROM kweet WHERE username = '${username}';`
     db.query(query, 
     (err,result)=>{
        fixTimesIn(result)
        if(err) {
        console.log(err)
        data.status = 400
        }
        else { data.status = 200 }
        data.body = result
        res.send(data)
    });  
});

// Route to get a users rekweets
app.get("/api/getRekweets/:username", (req,res)=>{
    const username = req.params.username;
    let query = 
    `SELECT rekweet_username, kweet.username, kweet.post_time, message, rekweet_time FROM rekweet 
    JOIN
    kweet
    ON
    rekweet.username = kweet.username
    AND
    rekweet.post_time = kweet.post_time
    AND
    rekweet_username = '${username}';`  
    db.query(query, 
     (err,result)=>{
        fixTimesIn(result)
        if(err) {
        console.log(err)
        data.status = 400
        }
        else { data.status = 200 }
        data.body = result
        res.send(data)
        });   
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})