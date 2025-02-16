const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        console.log('User is authenticated');
        next();
    } else {
        console.log('You do not have access');
        res.status(401).send('You do not have access');
    }

}


module.exports = { isAuthenticated }