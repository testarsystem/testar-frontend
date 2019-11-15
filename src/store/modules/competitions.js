import axios from '../../axios'
import errorParser from '../ErrorParser'
import OperationResult from '../OperationResult'
import {isTime} from '../../utils/DateUtils'

const validateCompetition = (competition) => {
  let errors = []
  if(!competition.title || competition.title.length < 1)
    errors.push(new Error('The title of competition can\'t be empty'))
  if(!competition.start_time || competition.start_time.length < 1)
    errors.push(new Error('The start time of competition can\'t be empty'))
  if(!competition.finish_time || competition.finish_time.length < 1)
    errors.push(new Error('The finish time of competition can\'t be empty'))
  if(!isTime(competition.duration))
    errors.push(new Error('Duration has wrong format. Use one of these formats instead: hh:mm[:ss]'))
  if(errors.length > 0) 
    throw errors
}

const actions = {
  async create({dispatch}, competition) {
    const result = new OperationResult()
    result.entity = competition
    try {
      validateCompetition(competition)      
      const response = await axios.post(`competition/v1/competitions/`, competition)
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
  async getAll() {
    const result = new OperationResult()
    try {
      const response = await axios.get(`competition/v1/competitions/`)
      result.entity = response.data
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

export default {
  namespaced: true,
  actions
}