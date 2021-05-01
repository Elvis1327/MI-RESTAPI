const jwt = require('jsonwebtoken');

const getJwt = (uid, name) =>{

    return new Promise((resolve, reject) => {
        const payLoad = { uid, name};

        jwt.sign(payLoad, process.env.SECRET_JWT_SEED, {
            expiresIn: '4h'
        }, (err, token)=>{
            if(err){
                console.log(err)
                reject(err);
            }else{
                resolve(token)
            }
        })

    })

};

module.exports = {
    getJwt
}



