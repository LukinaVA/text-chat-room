function logMiddleware(req, res, next) {
    console.info(`${req.method} ${req.url}`);
    next();
}

module.exports = logMiddleware;