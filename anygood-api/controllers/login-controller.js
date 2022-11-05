const jwt = require("jsonwebtoken");
const loginRepository = require("../repositories/login-repository");


const login = async (req, res) => {
    const user = await loginRepository.login(req.body.username, req.body.password);
    let retVal = {token: null, msg: "", status:200};
    retVal.msg = "";

    if(typeof user[0][0] === 'undefined'){
        retVal.msg = "Invalid credentials";
        res.send(retVal);
        return;
    }

    const toSend = {id: user[0][0].id, admin: user[0][0].admin, username: user[0][0].username};
    jwt.sign(toSend, 'internettechnologiessecretkey', (err, token) => {
        retVal.token = token;
        res.send(retVal);
    }, {expiresIn: '2h'});
    
}

const verifyLogin = (req, res) => {
    const token = req.body.token;

    if(token){
        const decode = jwt.verify(token,'internettechnologiessecretkey');

        res.json({
            login: true,
            data: decode
        });
    }else {
        res.json({
            login: false,
            data: "error"
        })
    }
}

module.exports = {
    login,
    verifyLogin
}