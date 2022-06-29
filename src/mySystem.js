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

    logout: (token , okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/login`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }).then(resp => {
            if (resp.status === 201) {
                okCallback()
            }
            else {
                errorCallback("Unable to logout")
            }
        }).catch(e => errorCallback("Unable to connect to My System API"))
    },
    getPosts: async (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/posts`, {
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
    },


    persistPost: async (post, okCallback, errorCallback, uncompleteFormErrorCallback) => {
       fetch(`${restApiEndpoint}/post`, {
           method: 'POST',
           
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(post)
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
   getMailfromToken: async (token, okCallback, errorCallback) => {
       fetch(`${restApiEndpoint}/mail`, {
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
    
   addArtistToPostList: async (data, okCallback, uncompleteFormErrorCallback, alreadySubmitedErrorCallback) => {
       fetch(`${restApiEndpoint}/artistList`, {
           method: 'POST',
           
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
       }).then(resp => {
           if (resp.status === 201) {
               okCallback()
           } else if (resp.status === 404){
               uncompleteFormErrorCallback()
           } else {
               alreadySubmitedErrorCallback()
           }
       })
   },

   getArtistList: async (postID, okCallback, errorCallback) => {
       fetch(`${restApiEndpoint}/getArtistList`, {
           method: 'POST',
           
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(postID)
       }).then(resp => {
           if (resp.status === 201) {
               resp.json().then(body => okCallback(body))
           } else {
               errorCallback()
           }
       })
   },

   getAllPosts: async (okCallback, errorCallback) => {
       fetch(`${restApiEndpoint}/getAllPosts`, {
           method: 'GET',
           
           headers: {
               'Content-Type': 'application/json'
           }
       }).then(resp => {
           if (resp.status === 201) {
               resp.json().then(body => okCallback(body))
           } else {
               errorCallback()
           }
       })
   },

   getPicFromMail: async (email, okCallback, errorCallback) => {
       fetch(`${restApiEndpoint}/getPicFromMail`, {
           method: 'POST',
           
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(email)
       }).then(resp => {
           if (resp.status === 201) {
               resp.json().then(body => okCallback(body))
           } else {
               errorCallback()
           }
       })
   },
   getUsersInChat: async (token, okCallback, errorCallback) => {
       fetch(`${restApiEndpoint}/chatUsers`, {
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

   getChatOfaMailHIM: async (emailME, emailHIM, okCallback, errorCallback) => {
       fetch(`${restApiEndpoint}/getChatOfaUser`, {
           method: 'POST',
           
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(emailME + "~" + emailHIM)
       }).then(resp => {
           if (resp.status === 201) {
               resp.json().then(body => okCallback(body))
           } else {
               errorCallback()
           }
       })
   },
   getMessagesInChat: async (emailME, emailHIM, okCallback, errorCallback) => {
       fetch(`${restApiEndpoint}/getMessages`, {
           method: 'POST',
           
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(emailME + "~" + emailHIM)
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