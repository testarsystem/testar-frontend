import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import tests from './modules/tests'
import questions from './modules/questions'
import answers from './modules/answers'
import competitions from './modules/competitions'
import publics from './modules/publics'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    tests,
    questions,
    answers,
    competitions,
    publics
  }
})