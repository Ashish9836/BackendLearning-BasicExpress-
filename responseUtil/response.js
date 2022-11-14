const success=(message,data)=>{
    return {message,data};
}
const error=(message)=>{
    return {message};
}
module.exports = {success,error};