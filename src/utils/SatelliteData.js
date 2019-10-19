// dependencies
const Command = require('./Command')
const Promise = require('bluebird');

class SatelliteData {
    logging = false;

    constructor(logging = false) {
        this.logging = logging
    }

    getSatellite(url) {
        let cmd = `curl -X GET ${url} -H 'charset: UTF-8'`
        let command = new Command(this.logging)
        let dataArray = [`NORAD ID`, `Int'l Code`, `Perigee`, `Apogee`, `Inclination`, `Period`, `Semi major axis`, `RCS`, `Launch date`, `Source`, `Launch site`]
        let res = {}

        return command.executeCommand(cmd)
            .then((data) => {

                dataArray.forEach((obj) => {
                    res[obj] = data.split(`<B>${obj}</B>:`)[1].split(`<`)[0]
                })
                // // res['description'] = 
                console.log(data.split('<div id="adsatellitepage">')[0].split('<br/><br/>').pop().replace(/<>/g, ''))

            }).catch((err) => {
                console.log(err)
            })
    }
}

module.exports = SatelliteData;