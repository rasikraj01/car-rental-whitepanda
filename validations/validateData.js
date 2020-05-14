const moment = require('moment');
function validateData(values) {
    
    let errors = {}
						

    // chcek if name contains any number
    if((/\d/.test(values.name))){
        errors.name = `Name can't contain numbers`
    }

    // checks if valid phone number
    if(!(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}$/.test(values.phoneNumber))){
        errors.phoneNumber = 'Enter a valid Indian phone number'
    }

    // checks if issue date is not in past
    if(values.issueDate < moment(Date.now()).format("YYYY-MM-DD")){
        errors.issueDate = 'Invalid Issue Date'
    }
    
    // checks if return date is after issue date
    if (values.returnDate < values.issueDate){
        errors.returnDate = 'Invalid Return Date'
    }

    // checks if fields are not empty
    if(!values.name){
        errors.name = 'Name is required'
    }
    if(!values.phoneNumber){
        errors.phoneNumber = 'Phone number is required'
    }
    if(!values.issueDate){
        errors.issueDate = 'Issue date is required'
    }
    if(!values.returnDate){
        errors.returnDate = 'Return date is required'
    }

    return errors
}
module.exports = validateData;