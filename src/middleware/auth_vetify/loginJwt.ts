
const jwt = require('jsonwebtoken')


export function LoginJwtMiddleware(req, res, next) {
    let token = req.headers.authorization
    let key = 'jwt'
    if(req.url === '/user/login'){
        next()
        return
    }
    jwt.verify(token, key, (err, decode) => {
        if(err){
            res.send({
                code: 400,
                message : '登录状态失效',
            })
        }else{
            next()
        }
    })
};