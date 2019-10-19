// dependencies

module.exports = {
    // returns the helm release version for the specified instance
    getIndex: function (req, res) {
        return res.status(200).send('ok')
    },
};
