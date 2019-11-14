const parseErrorList = (err) => {
  if (err instanceof Array)
    return err
  let errors = []
  if (err instanceof Error) {
    errors.push(err)
    return errors
  }
  for (let key in err)
    if (err[key] instanceof Array)
      errors = [...err[key]];
  if (errors.length == 0)
    errors.push(new Error(err))
  return errors
}

export default parseErrorList