import axios from '../../axios'
import ActionsEnum from '../../utils/ActionsEnum'

const createQuestion = async ({testId, question}) => {    
  const response = await axios.post(`test/v1/tests/${testId}/questions/`, question)
	return response.data
}

const updateQuestion = async ({testId, question}) => {   
	await axios.put(`test/v1/tests/${testId}/questions/${question.id}/`, question)
}

const deleteQuestion = async ({testId, questionId}) => {
  await axios.delete(`test/v1/tests/${testId}/questions/${questionId}/`)     
}

const actions = {
	async manageRange({dispatch},{testId, questions}) {
		if(questions instanceof Array) {
			for(let [i,question] of questions.entries()) {			
				switch (question.action) {
					case ActionsEnum.CREATE: {					
						questions[i]= await createQuestion({testId,question})
						questions[i].action = ActionsEnum.NONE
						break
					}
					case ActionsEnum.UPDATE: {						
						await updateQuestion({testId,question})
						questions[i].action = ActionsEnum.NONE 
						break  						 
					}     
					case ActionsEnum.DELETE: {
						await deleteQuestion({testId,questionId:question.id})
						questions.splice(i, 1)  
						continue
					}      
				}
				questions[i].answers = await dispatch('answers/manageRange', {testId, questionId: questions[i].id, answers: question.answers,questionIndex:i}, {root:true})	
			}
		}
		return questions
	}
}

export default {
	namespaced: true,
	actions
}