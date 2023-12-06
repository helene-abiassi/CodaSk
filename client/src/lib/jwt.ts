import jwt, {JwtPayload} from "jsonwebtoken"

interface SignOption {
    expiresIn?:string | number;
}

const options= {
    expiresIn: "3 days"
}

 function signJwtAccessToken (payload:JwtPayload, options:SignOption){
const secret_key = process.env.SECRET_KEY;
const token = jwt.sign(payload, secret_key!, options)
console.log('show me my token :>> ', token);
return token
}

 function verifyJwt(token:string){
    try {
const secret_key = process.env.SECRET_KEY;

const decoded = jwt.verify(token, secret_key!)

return decoded as JwtPayload
        
    } catch (error) {
        console.log('error in verifyJwt :>> ', error);
        return null
    }
}

export {signJwtAccessToken, verifyJwt}



