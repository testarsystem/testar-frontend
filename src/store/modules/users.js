import axios from '../../axios'
import errorParser from '../ErrorParser'

const state = {
  user: {
    name: 'name',
    username: 'username'
  }
}

const actions = {
  async loginUser({ commit }, authData) {
    try {
      const response = await axios.post(`auth/v1/login/`, authData);      
      let token = response.data.token;
      if (token) {
        commit('setToken', token)
        commit('setUser', response.data.user);

      } else {
        throw new Error("There were problems signing in to your account.");
      }
    }
    catch (err) {
      commit('deleteToken')
      commit('deleteUser')
      let errors = errorParser(err)
      throw (errors)
    }
  },
  async registerUser({ commit }, authData) {
    try {
      const response = await axios.post(`auth/v1/registration/`, authData);
      let token = response.data.token;
      if (token) {
        commit('setToken', token)
        commit('setUser', response.data.user);
      } else {
        throw new Error("There were problems creating your account.");
      }
    }
    catch (err) {
      commit('deleteToken')
      commit('deleteUser')
      let errors = errorParser(err)
      throw (errors)
    }
  },
  decodeUser({ state }) {
    var user = JSON.parse(localStorage.getItem('user'))
    if (user)
      state.user = user
  },
  logoutUser({ commit }) {
    commit('deleteToken')
    commit('deleteUser')
  }
}

const mutations = {
  setUser(state, { username, name }) {
    state.user = { username, name };
    localStorage.setItem('user', JSON.stringify({ username, name }))
  },
  deleteUser(state) {
    state.user = {
      name: 'name',
      username: 'username'
    }
    localStorage.removeItem('user')
  },
  setToken(_, token) {
    localStorage.setItem('token', token)
  },
  deleteToken() {
    localStorage.removeItem('token')
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}