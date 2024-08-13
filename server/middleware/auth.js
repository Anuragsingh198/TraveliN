const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const googleToken = token.length > 1000;

        if (googleToken) {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            req.user = { id: payload.sub, name: payload.name, photoUrl: payload.picture };
        } else {
            // Handle custom token here
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: 'Something is wrong with your authorization' });
    }
};

module.exports = auth;
