const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Authorization header comes in the format: Bearer {token}
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret_string_to_create_token");
        next();
    } catch(error) {
        res.status(401).json({
            message: "Auth failed!"
        });
    }
};