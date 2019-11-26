import axios from '../../axios'
import errorParser from '../ErrorParser'
import OperationResult from '../OperationResult'
import ActionsEnum from '../../utils/ActionsEnum'
import {validateTest} from '../../utils/TestValidation'

const state = {
  tests: []
}

const createTest = async (test) => {         
  const pureTest = {title:test.title, description:test.description}
  const response = await axios.post(`test/v1/tests/`, pureTest)
  test.id = response.data.id
  return test
}

const updateTest = async (test) => {        
  const pureTest = {id:test.id, title:test.title, description:test.description}
  await axios.put(`test/v1/tests/${id}/`, pureTest)
}

const deleteTest = async (id) => {
  await axios.delete(`test/v1/tests/${id}`)     
}

const actions = {
  async getAll({state,commit}) {
    const result = new OperationResult()
    try {
      if(state.tests.length < 1) {
        const response = await axios.get(`test/v1/tests/`)
        commit('setTests', response.data.results) 
      }
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {     
      return result
    }
  },
  async getById(_,id) {
    const result = new OperationResult()
    try {
      const response = await axios.get(`test/v1/tests/${id}`)
      result.entity = response.data
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {     
      return result
    }
  },
  async manage({dispatch,commit},test) {
    const result = new OperationResult()
    try { 
      validateTest(test)
      switch (test.action) {
        case ActionsEnum.CREATE:          
          test = await createTest(test)
          test.action = ActionsEnum.NONE        
          commit('addTest',test)
          break;
        case ActionsEnum.UPDATE:        
          await updateTest(test)
          commit('updateTest',test)   
          test.action = ActionsEnum.NONE         
          break;
        case ActionsEnum.DELETE:
          await deleteTest(test.id)
          commit('deleteTest',test.id)
          test.action = ActionsEnum.NONE 
          break;
        default:
          break;        
      }
      const questions = await dispatch('questions/manageRange', {testId: test.id, questions: test.questions}, {root:true})     
      test.questions = questions
      result.success()
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {
      result.entity = test
      return result
    }
  }
}

const mutations = {
  setTests(state, tests) {
    state.tests = tests
  },
  deleteTest(state, id) {
    const i = state.tests.findIndex(t=>{
      return t.id == id
    })
    if(i>=0)
      state.tests.splice(i,1)
  },
  updateTest(state, test) {
    const i = state.tests.findIndex(t=>{
      return t.id == test.id
    })
    if(i>=0) {
      state.tests[i].id = test.id
      state.tests[i].title = test.title
      state.tests[i].description = test.description
    }
  },
  addTest(state,test) {
    if(state.tests.length > 0)
      state.tests.push(test)
  }
}

export default {
  namespaced: true,
  actions,
  state, 
  mutations
}