class OperationResult {
  constructor() {
    this.entity = {}
    this.errors = []
    this.isSuccess = null
  }

  addError(error) {
    this.isSuccess = false
    this.errors.push(new Error(error))
  }

  addErrors(errors) {
    this.isSuccess = false
    this.errors = [...this.errors, ...errors]
  }

  success() {
    this.isSuccess = true
    this.errors = []
  }

}
export default OperationResult