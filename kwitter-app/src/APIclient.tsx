import React,{useState,useEffect} from 'react'
import axios from 'axios'

const HOST = 'localhost'
const PORT = '10001'

const url = (path : string, param : string) => {
    return (`http://${HOST}:${PORT}/api/${path}/${param}`)
}

var APIclient = {
    async getTimeline(username : string){
        return await axios.get(url('getTimeline', username)) 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );
    },

    async getProfilePicture(username : string){
        return await axios.get(url('getProfilePicture', username)) 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );
    },

    async login(params : Object){
        let info = JSON.stringify(params)
        return await axios.get(url('login', info)) //this is where we send the request 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );  
    },

    async getUsers(params : Object){
        let info = JSON.stringify(params)
        return await axios.get(url('getUsers', info)) //this is where we send the request 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );  
    },

    async getFavorites(username : string){
        return await axios.get(url('getFavorites', username)) 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );
    },

    async getUserKweets(username : string){
        return await axios.get(url('getUserKweets', username)) 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );
    },

    async getRekweets(username : string){
        return await axios.get(url('getRekweets', username)) 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );
    },
}

export default APIclient;
