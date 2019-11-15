export const getDateString = (date) => {
  if(date){
    return new Date(date).toString().slice(0,24)
  }
  else
   return ''
}

export const toISODate = (dateString) => {
  if(isDate(dateString))
    return new Date(dateString).toISOString()
  else
    return ''
}

export const isDate = (date) => {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

export const isTime = (time) => {
  return time.match(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])(:([0-5]?[0-9]))?$/)
}