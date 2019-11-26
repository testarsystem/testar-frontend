import axios from '../../axios'
import ActionsEnum from '../../utils/ActionsEnum'

const createAnswer = async ({testId,questionId,answer}) => {    
  const response = await axios.post(`test/v1/tests/${testId}/questions/${questionId}/answers/`, answer)
	return response.data
}

const updateAnswer = async ({testId,questionId,answer}) => {    
  await axios.put(`test/v1/tests/${testId}/questions/${questionId}/answers/${answer.id}/`, answer)
}

const deleteAnswer = async ({testId, questionId, answerId}) => {
  await axios.delete(`test/v1/tests/${testId}/questions/${questionId}/answers/${answerId}/`)  
}

const actions = {
  async manageRange(_,{testId, questionId, answers, questionIndex}) { 
    if(answers instanceof Array) { 
      for(let [i,answer] of answers.entries()) {   
        switch (answer.action) {
          case ActionsEnum.CREATE:
            answers[i] = await createAnswer({testId,questionId,answer})
            answers[i].action = ActionsEnum.NONE
            break
          case ActionsEnum.UPDATE:          
            await updateAnswer({testId,questionId,answer})
            answers[i].action = ActionsEnum.NONE 
            break        
          case ActionsEnum.DELETE:
            await deleteAnswer({testId,questionId,answerId:answer.id})
            answers.splice(i, 1)   
            break     
        }				
      }
      return answers
    }
	}
}

export default {
  namespaced: true,
  actions
}