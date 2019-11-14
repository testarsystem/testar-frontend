import axios from '../../axios'
import errorParser from '../ErrorParser'

const actions = {
  async create(_, {testId,questionId,answer}) {
    try {
      const response = await axios.post(`test/v1/tests/${testId}/questions/${questionId}/answers/`, answer)
      return response.data
    }
    catch (err) {
      let errors = errorParser(err)
      throw (errors)
    }
  },
  async createRange({dispatch},{testId,questionId,answers}) {
    for(let [i,answer] of answers.entries()) {
      try {
        if(answer.id == 0 || !answer.id) {         
          const response = await dispatch('create', {testId, questionId, answer})
				  answers[i].id = response.id
        }
      }
      catch (err) {
        let errors = errorParser(err)
        throw (errors)
      }
    }
    return answers
  },
  async update(_, {testId,questionId,answer}) {
    try {
      await axios.put(`test/v1/tests/${testId}/questions/${questionId}/answers/${answer.id}/`, answer)
    }
    catch (err) {
      let errors = errorParser(err)
      throw (errors)
    }
  },
	async updateRange({dispatch},{testId,questionId,answers}) {
		for(let [i,answer] of answers.entries()) {
			try {
				if(answer.id == 0 || !answer.id) {
					const response = await dispatch('create', {testId, questionId,answer})
					answers[i].id = response.id
        } else if(answer.isEdited) {
          await dispatch('update', {testId, questionId,answer})
          answers[i].isEdited = false
				}   
			}
			catch (err) {
				let errors = errorParser(err)
				throw (errors)
			}
		}
		return answers
	}
}

export default {
  namespaced: true,
  actions
}