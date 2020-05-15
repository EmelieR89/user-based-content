function requireLogin(req, res, next) {
    if (req.session.userId) {
        next()
    } else {
        res.status(401).json('You must login...')
    }
}

module.exports = { requireLogin }