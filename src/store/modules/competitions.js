import axios from '../../axios'
import errorParser from '../ErrorParser'
import OperationResult from '../OperationResult'
import {validateCompetition} from '../../utils/Validation'
import {getDateString} from '../../utils/DateUtils'

const state = {
  myCompetitions: [],
  competitions: [],
  partCompetitions: []
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
  async getMyAll({state,commit}) {
    const result = new OperationResult()
    try {
      if(state.myCompetitions.length < 1) {
        const response = await axios.get(`competition/v1/competitions/`)
        commit('setMyCompetitions',response.data.results) 
      }
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
  async getParticipatedAll({state,commit}) {
    const result = new OperationResult()
    try {
      if(state.partCompetitions.length < 1) {
        const response = await axios.get(`competition/v1/competitions?participated=1/`)
        commit('setPartCompetitions',response.data.results) 
      }
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
  async getById(_,id) {
    const result = new OperationResult()
    try {
      let response = await axios.get(`competition/v1/competitions/${id}/`)     
      result.entity = response.data
      result.entity.created = getDateString(result.entity.created)
      result.entity.start_time = getDateString(result.entity.start_time)
      result.entity.finish_time = getDateString(result.entity.finish_time)
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
  async getByIdWithParticipants(_,id) {
    const result = new OperationResult()
    try {
      let response = await axios.get(`competition/v1/competitions/${id}/`)     
      result.entity = response.data
      response = await axios.get(`competition/v1/competitions/${id}/participants`)
      result.entity = {...result.entity,...{participants:response.data.results}}
      result.entity.created = getDateString(result.entity.created)
      result.entity.start_time = getDateString(result.entity.start_time)
      result.entity.finish_time = getDateString(result.entity.finish_time)
      result.entity.participants.forEach((element,i) => {
        result.entity.participants[i].start_time = getDateString(element.start_time)
        result.entity.participants[i].end_time = getDateString(element.end_time)
      });
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
  async update({commit},competition) {
    const result = new OperationResult()
    try {
      const response = await axios.put(`competition/v1/competitions/${competition.id}/`,competition)
      result.entity = response.data
      commit('updateMyCompetition',result.entity) 
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
  async delete({commit},id) {
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
  
  setPartCompetitions(state,competitions) {
    competitions.forEach( competition => {
      competition.created = getDateString(competition.created)
      competition.start_time = getDateString(competition.start_time)
      competition.finish_time = getDateString(competition.finish_time)
    })
    state.partCompetitions = competitions
  },
  addMyCompetition(state,competition) {
    if(state.myCompetitions.length > 0){
      competition.start_time = getDateString(competition.start_time)
      competition.finish_time = getDateString(competition.finish_time)
      state.myCompetitions.push(competition)
    }
  },
  updateMyCompetition(state,competition) {
    const i = state.myCompetitions.findIndex(c=>{
      return c.id == competition.id
    })
    if(i>=0) {
      competition.start_time = getDateString(competition.start_time)
      competition.finish_time = getDateString(competition.finish_time)
      state.myCompetitions[i] = competition
    }
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