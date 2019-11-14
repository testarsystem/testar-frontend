export const getDateString = (date) => {
  if(date){
    let dateString = date.split('.')
    return dateString[0].replace('T',' ')
  }
}