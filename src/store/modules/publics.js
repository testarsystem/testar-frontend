import axios from '../../axios'
import errorParser from '../ErrorParser'
import OperationResult from '../OperationResult'
import {getDateString} from '../../utils/DateUtils'

const state = {
  competitions: []
}

const actions = {
  async getAll({state,commit}) {
    const result = new OperationResult()
    try {
      if(state.competitions.length < 1) {
        const response = await axios.get(`public/v1/competitions/`)
        commit('setCompetitions',response.data.results) 
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
  async getByIdWithParticipants(_,id) {
    const result = new OperationResult()
    try {
      const response = await axios.get(`public/v1/competitions/${id}/participants/`)
      result.entity = response.data.results
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
  async getByIdWithTest(_,id) {
    const result = new OperationResult()
    try {
      let response = await axios.get(`public/v1/competitions/${id}/`)     
      result.entity = response.data
      response = await axios.get(`public/v1/competitions/${id}/test`)
      result.entity.test = response.data
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
  setCompetitions(state,competitions) {
    competitions.forEach( competition => {
      competition.created = getDateString(competition.created)
      competition.start_time = getDateString(competition.start_time)
      competition.finish_time = getDateString(competition.finish_time)
    })
    state.competitions = competitions
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}