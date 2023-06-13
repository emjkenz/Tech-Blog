const logout = (req, res) => {
    req.session.destroy(); // Destroy the session and remove the user
    res.redirect('/login'); // Redirect to the login page
}

module.exports = logout;