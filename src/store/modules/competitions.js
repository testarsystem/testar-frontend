import axios from '../../axios'
import errorParser from '../ErrorParser'
import OperationResult from '../OperationResult'
import {validateCompetition} from '../../utils/Validation'
import {getDateString} from '../../utils/DateUtils'
import { join } from 'path'

const state = {
  myCompetitions: [],
  competitions: []
}

const actions = {
  async create({commit}, competition) {
    const result = new OperationResult()
    result.entity = competition
    try {
      validateCompetition(competition)      
      const response = await axios.post(`competition/v1/competitions/`, competition)
      result.entity = response.data  
      commit('addMyCompetition',result.entity)  
      result.success()
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {     
      return result
    }
  },
  async getAll({state,commit}) {
    const result = new OperationResult()
    try {
      if(state.competitions.length < 1) {
        const response = await axios.get(`public/v1/competitions/`)
        commit('setCompetitions',response.data.results) 
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
  async getMyAll({state,commit}) {
    const result = new OperationResult()
    try {
      if(state.myCompetitions.length < 1) {
        const response = await axios.get(`competition/v1/competitions/`)
        commit('setMyCompetitions',response.data.results) 
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
      let response = await axios.get(`public/v1/competitions/${id}/`)     
      result.entity = response.data
      response = await axios.get(`public/v1/competitions/${id}/test`)
      result.entity.test = response.data
      result.entity.created = getDateString(result.entity.created)
      result.entity.start_time = getDateString(result.entity.start_time)
      result.entity.finish_time = getDateString(result.entity.finish_time)
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {     
      return result
    }
  },
  async update({commit},competition) {
    const result = new OperationResult()
    try {
      const response = await axios.put(`competition/v1/competitions/${competition.id}/`,competition)
      result.entity = response.data
      commit('updateMyCompetition',result.entity) 
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {     
      return result
    }
  },
  async delete(_,id) {
    const result = new OperationResult()
    try {
      await axios.delete(`competition/v1/competitions/${id}/`)
      commit('deleteMyCompetition',id) 
      result.success()
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {     
      return result
    }
  },
  async join(_,id) {
    const result = new OperationResult()
    try {
      await axios.post(`public/v1/competitions/${id}/join/`)
      result.success()
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {     
      return result
    }
  },
  async start(_,id) {
    const result = new OperationResult()
    try {
      await axios.post(`public/v1/competitions/${id}/start/`)
      result.success()
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {     
      return result
    }
  },
  async submit(_,{id,question,answer}) {
    const result = new OperationResult()
    try {
      const response = await axios.post(`public/v1/competitions/${id}/submit/`,{question,answer})
      result.entity = response.data
      result.success()
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {     
      return result
    }
  },
  async deleteSubmit(_,{id,answer}) {
    const result = new OperationResult()
    try {
      await axios.post(`public/v1/competitions/${id}/delete_submit/`,{id:answer})
      result.success()
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {     
      return result
    }
  },
  async finish(_,id) {
    const result = new OperationResult()
    try {
      const response = await axios.post(`public/v1/competitions/${id}/finish/`)
      result.entity = response.data
      result.entity.start_time = getDateString(result.entity.start_time)
      result.entity.end_time = getDateString(result.entity.end_time)
      result.success()
    }
    catch (err) {
      const errors = errorParser(err)
      result.addErrors(errors)
    }
    finally {     
      return result
    }
  }
}

const mutations = {
  setMyCompetitions(state,competitions) {
    competitions.forEach( competition => {
      competition.created = getDateString(competition.created)
      competition.start_time = getDateString(competition.start_time)
      competition.finish_time = getDateString(competition.finish_time)
    })
    state.myCompetitions = competitions
  }, 
  setCompetitions(state,competitions) {
    competitions.forEach( competition => {
      competition.created = getDateString(competition.created)
      competition.start_time = getDateString(competition.start_time)
      competition.finish_time = getDateString(competition.finish_time)
    })
    state.competitions = competitions
  },
  addMyCompetition(state,competition) {
    if(state.myCompetitions.length > 0)
      state.myCompetitions.push(competition)
  },
  updateMyCompetition(state,competition) {
    const i = state.myCompetitions.findIndex(c=>{
      return c.id == competition.id
    })
    if(i>=0)
      state.myCompetitions[i] = competition
  },
  deleteMyCompetition(state,id) {
    const i = state.myCompetitions.findIndex(c=>{
      return c.id == id
    })
    if(i>=0)
      state.myCompetitions.splice(i,1)
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}