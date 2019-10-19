// dependencies

module.exports = {
    getIndex: function (req, res) {
        return res.status(200).send('ok')
    },

    getSatPosition: function(req, res) {

        let userLat = req.params["userLat"]
        let userLong = req.params["userLong"]

        // Call NY2O API

        // Temp hardcoded values
        let satLat = "19203.9213"
        let satLong = "12.2312"

        let respJson = []

        respJson.push({"model": "default", "userLat": satLat, "userLong": satLong})
        respJson.push({"model": "default", "userLat": satLat, "userLong": satLong})

        return res.status(200).json(respJson)
    }
};
