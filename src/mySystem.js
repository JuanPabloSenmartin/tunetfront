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
    getLocalPosts: async (token, okCallback, errorCallback) => {
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
    
   addArtistToPostList: async (data, okCallback) => {
       fetch(`${restApiEndpoint}/artistList`, {
           method: 'POST',
           
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
       }).then(resp => {
           if (resp.status === 201) {
               okCallback()
           } 
       })
   },
    
    deleteArtistFromPostList: async (data, okCallback) => {
       fetch(`${restApiEndpoint}/deleteArtistFromPostList`, {
           method: 'POST',
           
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
       }).then(resp => {
           if (resp.status === 201) {
               okCallback()
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

   getAllPosts: async (data, okCallback, errorCallback) => {
       fetch(`${restApiEndpoint}/getAllPosts`, {
           method: 'POST',
           
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
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
   },
   addRating: async (email, rating, okCallback, errorCallback) => {
       fetch(`${restApiEndpoint}/rating`, {
           method: 'POST',
           
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(rating + "~" + email)
       }).then(resp => {
           if (resp.status === 201) {
               okCallback()
           } else {
               errorCallback()
           }
       })
   },
    addGalleryImage: async (data, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/addGalleryImage`, {
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

    getGalleryImages: async (mail, okCallback, errorCallback) => {
     fetch(`${restApiEndpoint}/getGalleryImages`, {
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
     deleteGalleryImage: async (data, okCallback, errorCallback) => {
         fetch(`${restApiEndpoint}/deleteGalleryImage`, {
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

     changeProfilePic: async (email, okCallback, errorCallback) => {
         fetch(`${restApiEndpoint}/changeProfilePic`, {
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
     addSong: async (data, okCallback, errorCallback) => {
         fetch(`${restApiEndpoint}/addSong`, {
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
 
     getSongs: async (mail, okCallback, errorCallback) => {
      fetch(`${restApiEndpoint}/getSongs`, {
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
      deleteSong: async (data, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/deleteSong`, {
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
      getPostulatedPosts: async (token, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/getPostulatedPosts`, {
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
      getOldPosts: async (token, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/getOldPosts`, {
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

      getPostFeed: async (data, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/getPostFeed`, {
              method: 'POST',
              
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then(resp => {
              if (resp.status === 201) {
                  resp.json().then(body => okCallback(body))
              } else {
                  errorCallback()
              }
          })
      },

      getPostsInfo: async (data, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/getPostsInfo`, {
              method: 'POST',
              
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then(resp => {
              if (resp.status === 201) {
                  resp.json().then(body => okCallback(body))
              } else {
                  errorCallback()
              }
          })
      },

      acceptArtistInPost: async (data, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/acceptArtistInPost`, {
              method: 'POST',
              
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then(resp => {
              if (resp.status === 201) {
                  resp.json().then(body => okCallback(body))
              } else {
                  errorCallback()
              }
          })
      },

      getLocalPostsInfo: async (data, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/getLocalPostsInfo`, {
              method: 'POST',
              
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then(resp => {
              if (resp.status === 201) {
                  resp.json().then(body => okCallback(body))
              } else {
                  errorCallback()
              }
          })
      },

      sendMail: async (data, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/sendMail`, {
              method: 'POST',
              
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then(resp => {
              if (resp.status === 201) {
                  resp.json().then(body => okCallback(body))
              } else {
                  errorCallback()
              }
          })
      },

      getNotifications: async (token, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/getNotifications`, {
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

      deleteNotification: async (notificationId, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/deleteNotification`, {
              method: 'POST',
              
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(notificationId)
          }).then(resp => {
            if (resp.status === 201) {
                okCallback()
            } else {
                errorCallback()
            }
          })
      },

      seeNotifications: async (token, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/seeNotifications`, {
              method: 'POST',
              
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

      deletePost: async (id, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/deletePost`, {
              method: 'POST',
              
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(id)
          }).then(resp => {
            if (resp.status === 201) {
                okCallback()
            } else {
                errorCallback()
            }
          })
      },

      rejectAcceptedArtist: async (id, okCallback, errorCallback) => {
          fetch(`${restApiEndpoint}/rejectAcceptedArtist`, {
              method: 'POST',
              
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(id)
          }).then(resp => {
            if (resp.status === 201) {
                okCallback()
            } else {
                errorCallback()
            }
          })
      }
}

const useMySystem = () => MySystem

export {useMySystem};