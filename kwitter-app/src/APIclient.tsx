import axios from 'axios'

const HOST = '67.189.157.94'
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

    async toggleFavorite(params : Object){
        let info = JSON.stringify(params)
        return await axios.get(url('favorite', info))
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );
    },

    async toggleRekweet(params : Object){
        let info = JSON.stringify(params)
        return await axios.get(url('rekweet', info))
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

    async signUp(params : Object){
        let info = JSON.stringify(params)
        return await axios.get(url('signUp', info)) //this is where we send the request 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );  
    },

    async getFollow(params : Object){
        let info = JSON.stringify(params)
        return await axios.get(url('getFollow', info)) //this is where we send the request 
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

    async postKweet(params : Object){
        let info = JSON.stringify(params)
        return await axios.get(url('postKweet', info)) 
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );
    },

    async deleteKweet(params : Object){
        let info = JSON.stringify(params)
        return await axios.get(url('deleteKweet', info))
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );
    },

    async searchUser(username : string){
        return await axios.get(url('searchUser', username))
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );
    },

    async checkFollow(params : Object){
        let info = JSON.stringify(params)
        return await axios.get(url('checkFollow', info))
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );
    },

    async toggleFollow(params : Object){
        let info = JSON.stringify(params)
        return await axios.get(url('toggleFollow', info))
            .then( (res) => {
                return res
            })
            .catch((err) => {return err}
        );
    },
}

export default APIclient;
