module.exports = async (req, res) => {
    const token = req.csrfToken();
    res.cookie('X-CSRF-TOKEN', token);

    return res.send({ csrfToken: token });
}