import {createStore} from 'vuex'

export default createStore({
    state:{ 
        user:null,
        token:null,
    },
    getters:{
        IS_USER_AUTHENTICATE_GETTER(state) {
            return state.token !== null
        },
        IS_USER_ISADMIN_GETTER(state) {
            return state.user !== null && state.user.isAdmin
            
        },
        GET_USER_DATA_GETTER(state) {
            return state.user
        }
    },
    mutations: {
        UPDATE_STATE(state, data) {
            state.user = data.user
            state.token = data.token
            console.log(state)   
        }
        
    },
    actions:{
        updateUserData({commit}, data) { //data + token
            commit("UPDATE_STATE", data)
        }
        
    }
  })