module.exports = {
    accessTokenExpiration: 60 * 3, // 3 min
    refreshTokenExpiration: 60 * 30, // 30 min
    defaultPageLimit: 10,
    tokenSecret: process.env.TOKEN_SECRET
}
