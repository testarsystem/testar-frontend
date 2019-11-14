import axios from '../../axios'
import errorParser from '../ErrorParser'

const actions = {
	async create(_, {testId, question}) {
		try {
			const response = await axios.post(`test/v1/tests/${testId}/questions/`, question)
			return response.data
		}
		catch (err) {
			const errors = errorParser(err)
			throw (errors)
		}
	},
	async createRange({dispatch},{testId, questions}) {
		for(let [i,question] of questions.entries()) {
			try {
				if(question.id == 0 || !question.id) {
					const response = await dispatch('create', {testId, question})
					questions[i].id = response.id
				}
				questions[i].answers = await dispatch('answers/createRange', {testId, questionId: questions[i].id, answers: question.answers}, {root:true})
			}
			catch (err) {
				let errors = errorParser(err)
				throw (errors)
			}
		}
		return questions
	}
}

export default {
	namespaced: true,
	actions
}