const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    // Bearer {token}
    try {
        console.log("before token");
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        console.log("after token");
        console.log(token);
        jwt.verify(token, "secret_string_to_create_token");
        next();
    } catch(error) {
        res.status(401).json({
            message: "Auth failed!"
        });
    }
};