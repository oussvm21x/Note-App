function checkAuth(req, res, next) {
    // Check if user is logged in
    if (req.user) {
        // User is logged in, proceed to the next middleware
        next();
    } else {
        // User is not logged in, send an error response
        res.status(401).send({ error: 'Unauthorized' });
    }
}

export default checkAuth;