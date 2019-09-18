module.exports = function(errorCode,message){
    const error = new Error(message)
    error.name = errorCode
    throw error 
}
