import axios from '../../axios'
import errorParser from '../ErrorParser'
import OperationResult from '../OperationResult'

const validateTest = (test) => {
  let errors = []
  if(!test.title || test.title.length < 1)
    errors.push(new Error('The title of test can\'t be empty'))
  const quesErrors = validateQuestions(test.questions)
  errors = [...errors,...quesErrors]
  if(errors.length > 0) 
    throw errors
}

const validateQuestions = (questions) => {
  let errors = []
  questions.forEach((question,i) => {
    if(!question.text || question.text.length < 1)
      errors.push(new Error(`The text of Question ${i+1} can\'t be empty`))  
    const ansErrors = validateAnswers({questionIndex: i, answers: question.answers})
    errors = [...errors,...ansErrors]  
  });
  return errors
}

const validateAnswers = ({questionIndex,answers}) => {
  let errors = []
  let isCorrect = false
  answers.forEach((answer,i) => {
    if(!answer.text || answer.text.length < 1)
      errors.push(new Error(`The text of Answer ${i+1} - Question ${questionIndex+1} can\'t be empty`)) 
    if(answer.correct)
      isCorrect = true   
  });
  if(!isCorrect)
    errors.push(new Error(`The Question ${questionIndex+1} must have at least one correct option`)) 
  return errors
}

const actions = {
  async create({dispatch}, test) {
    const result = new OperationResult()
    result.entity = test
    try {
      if(test.id == 0 || !test.id) {      
        validateTest(test)      
        const pureTest = {title: test.title, description: test.description}
        const response = await axios.post(`test/v1/tests/`, pureTest)
        test.id = response.data.id
        result.entity = test
      }
      test.questions = await dispatch('questions/createRange', {testId: test.id, questions: test.questions}, {root:true})
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
      const response = await axios.get(`test/v1/tests/`)
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
  async update({dispatch}, test) {
    const result = new OperationResult()
    result.entity = test
    try {
      validateTest(test)      
        const pureTest = {title: test.title, description: test.description}
      if(test.id == 0 || !test.id) {      
        const response = await axios.post(`test/v1/tests/`, pureTest)
        test.id = response.data.id
        result.entity = test
      } else if(test.isEdited) {        
        await axios.put(`test/v1/tests/${test.id}/`, pureTest)
        test.isEdited = false
      }
      test.questions = await dispatch('questions/updateRange', {testId: test.id, questions: test.questions}, {root:true})
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
  async delete(_,id) {
    const result = new OperationResult()
    try {
      await axios.delete(`test/v1/tests/${id}`)
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

export default {
  namespaced: true,
  actions
}