const jwt = require('jsonwebtoken')

export const getToken = (username: string) => {
    let content = {name:username}
    let key = 'jwt'
    let token = jwt.sign(content,key,{expiresIn: 5*60*60})
    return token
}