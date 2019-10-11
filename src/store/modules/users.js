import axios from '../../axios'

const state = {
    user: {}
}

const actions ={
    async loginUser({commit}, authData){
        try{
            const response = await axios.post(`/login`, authData);
            let token = response.data.jwt;
            if (token) {
                localStorage.setItem('token', token);  
                commit('setUser', response.data); 
            } else {
                throw new Error("Неверный логин или пароль");
            }
        }
        catch(err) {
            localStorage.removeItem('token');
            if(err.status == "404"){
                throw new Error("Неверный логин или пароль");
            }
            else
                throw(err);
        }
    },
    async registerUser({commit},authData){
        try{
            const response = await axios.post(`/register`, authData);
            let token = response.data.jwt;
            if (token) {
                localStorage.setItem('token', token);
                commit('setUser', response.data.user);
            } else {
                throw(err);
            }
        }
        catch(err) {
            localStorage.removeItem('token');
            throw(err);
        }
    }
}

const mutations = {
    setUser(state, user){
        state.user = user;
    }
}
export default{
    namespaced: true,
    state,
    actions,
    mutations
}