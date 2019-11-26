import ActionsEnum from './ActionsEnum'

export const validateTest = (test) => {
  if(test.action == ActionsEnum.DELETE)
    return
  let errors = []
  if(!test.title || test.title.length < 1)
    errors.push(new Error('The title of test can\'t be empty'))
  const quesErrors = validateQuestions(test.questions)
  errors = [...errors,...quesErrors]
  if(errors.length > 0) 
    throw errors
}

export const validateQuestions = (questions) => {
  let errors = []
  for(let [i,question] of questions.entries()) {
    if(question.action == ActionsEnum.DELETE)
      continue
    if(!question.text || question.text.length < 1)
      errors.push(new Error(`The text of Question ${i+1} can\'t be empty`))  
    const ansErrors = validateAnswers({questionIndex: i, answers: question.answers})
    errors = [...errors,...ansErrors]  
  }
  return errors
}

export const validateAnswers = ({questionIndex,answers}) => {
  let errors = []
  let isCorrect = false
  for(let [i,answer] of answers.entries()) { 
    if(answer.action == ActionsEnum.DELETE)
      continue
    if(!answer.text || answer.text.length < 1)
      errors.push(new Error(`The text of Answer ${i+1} - Question ${questionIndex+1} can\'t be empty`)) 
    if(answer.correct)
      isCorrect = true   
  }
  if(!isCorrect)
    errors.push(new Error(`The Question ${questionIndex+1} must have at least one correct option`)) 
  return errors
}