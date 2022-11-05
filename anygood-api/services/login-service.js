const loginRepository = require("../repositories/login-repository");
const jwt = require("jsonwebtoken");

const login = async (username, password) => {
    const user = await loginRepository.login(username, password);
    var retVal = {token: null, msg: "", status:200};
    retVal.msg = "";

    if(typeof user === 'undefined'){
        retVal.msg = "Invalid credentials";
        return retVal;
    }
    
    jwt.sign({user}, 'internettechnologiessecretkey', (err, token) => {
        retVal.token = token;
        return retVal;
    }, {expiresIn: '2h'});
    
}

module.exports = {
    login
}