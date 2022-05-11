const restApiEndpoint = "http://localhost:4321"

const MySystem = {
    login: (credentials, okArtistCallback, okLocalCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(resp => {
            if (resp.status === 201) {
                resp.json().then(body => okArtistCallback(body))
            }
            else if (resp.status === 200){
                resp.json().then(body => okLocalCallback(body))
            } else {
                errorCallback("Invalid user or password")
            }
        }).catch(e => errorCallback("Unable to connect to My System API"))
    },


     register: async (user, okCallback, errorCallback, uncompleteFormErrorCallback) => {
        fetch(`${restApiEndpoint}/register`, {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(resp => {
            if (resp.status === 201) {
                okCallback()
            } else if (resp.status === 409) {
                errorCallback()
            } else {
                uncompleteFormErrorCallback()
            }
        })
    },

    /* 
    listUsers: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(users => okCallback(users))
            } else {
                errorCallback()
            }
        })
    },
    */
    getPostList: async (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/posts`, {
            method: 'GET',
            
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
        }).then(resp => {
            if (resp.status === 201) {
                okCallback()
            } else {
                errorCallback()
            }
        })
    },
    getProfileData: async (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/viewProfile`, {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
        }).then(resp => {
            if (resp.status === 201) {
                resp.json().then(body => okCallback(body))
            } else {
                errorCallback()
            }
        })
    },
    
    refreshDatabaseAfterProfileEdit: async (data, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/editProfile`, {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => {
            if (resp.status === 201) {
                okCallback()
            } else {
                errorCallback()
            }
        })
    },
    
    getProfileDataByMail: async (mail, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/viewOtherProfile`, {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mail)
        }).then(resp => {
            if (resp.status === 201) {
                resp.json().then(body => okCallback(body))
            } else {
                errorCallback()
            }
        })
    }
    
}

const useMySystem = () => MySystem

export {useMySystem};