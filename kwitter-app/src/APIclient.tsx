import React,{useState,useEffect} from 'react'
import axios from 'axios'

var APIclient  = {
    async login(data : Object){
        let info = JSON.stringify(data)
        return await axios.get(`http://localhost:10001/api/login/${info}`) //this is where we send the request 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );  
    },
}

export default APIclient;
