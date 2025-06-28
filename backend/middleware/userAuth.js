import jwt from 'jsonwebtoken'


const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized login again' })
    } else {
        try {
            const dec_token = jwt.verify(token, process.env.JWT_SECRET)
            req.body.userId = dec_token.id
            next()
        } catch (error) {
            console.log(error);
            return res.json({ success: false, message: error.message })
        }

    }
}


export default authUser