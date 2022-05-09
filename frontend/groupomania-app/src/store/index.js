import {createStore} from 'vuex'
import {setCookie, deleteCookie} from '../utils/cookie.js'

const getDefaultState = () => {
    return { 
        user:null,
        token:null,
    }
}

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
        },
         
    },
    mutations: {
        UPDATE_STATE(state, data) {
            state.user = data.user
            state.token = data.token
            console.log(state)   
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        },  
        
    },
    actions:{
        updateUserData({commit}, data) { //data + token
            commit("UPDATE_STATE", data);
            const expiredTimestamp = (new Date()).getTime() + 24*60*60*1000 // current timestamp + 24h
            const expiredDate = new Date(expiredTimestamp)
            setCookie('userData', JSON.stringify(data),expiredDate); 
        },
        resetState({ commit }) {            
            commit('RESET_STATE')
            deleteCookie('userData')
            
        },       
    }
  })

  