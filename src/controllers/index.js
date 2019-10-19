// dependencies

const sat = require('./../utils/Satellites');

module.exports = {
    getIndex: function (req, res) {
        return res.status(200).send('ok')
    },

    getSatPosition: async function(req, res) {

        let userLat = req.params["userLat"]
        let userLong = req.params["userLong"]
        const userAlt = 0;

        const satelliteList = ["25544", "36516", "33591", "29155", "25338", "28654", "25994", "27424", "38771", "37849"];

        const satPositions = await sat.getSatelliteList(satelliteList, userLat, userLong, userAlt)

        if (satPositions === []) {
            return res.status(500).send()
        }
        return res.status(200).json(satPositions);
    }
};
