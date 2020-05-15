const validNumberRegex = RegExp(/^\d*[1-9]\d*$/)
export default validNumberRegex

const validateEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
export default validateEmailRegex
