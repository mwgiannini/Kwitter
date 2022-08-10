import React,{useState,useEffect} from 'react'
import axios from 'axios'

var APIclient = {
    async getTimeline(username : string){
        return await axios.post(`/api/getTimeline/${username}`, username) //this is where we send the request 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );  
    },

    async login(data : Object){
        return await axios.post('/api/login', data) //this is where we send the request 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );  
    }
}

