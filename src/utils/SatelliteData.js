// dependencies
const Command = require('./Command')
const titleCase = require('./ArrayMethods').titleCase

class SatelliteData {
    logging = false;

    constructor(logging = false) {
        this.logging = logging
    }

    getSatellite(url) {
        let cmd = `curl -X GET ${url} -H 'charset: UTF-8'`
        let command = new Command(this.logging)
        let dataArray = ['NORAD ID', 'Int\'l Code', 'Perigee', 'Apogee', 'Period', 'Semi major axis', 'RCS', 'Source', 'Launch site']
        let res = {}
        let excluded = ['and', 'des']

        return command.executeCommand(cmd)
            .then((data) => {

                dataArray.forEach((obj) => {
                    res[obj] = data.split(`<B>${obj}</B>:`)[1].split('<')[0].trim()
                })

                res['Inclination'] = data.split('<B>Inclination</B>:')[1].split('<')[0].replace(/(&deg)/g, '').trim()
                res['Launch date'] = data.split('<B>Launch date</B>:')[1].split('</a>')[0].replace(/(<.*?>)/g, '').trim()
                res['description'] = data.split('<div id="adsatellitepage">')[0].split('<br/><br/>').pop().replace(/(<.*?>)/g, '').trim()

                res['Launch site'] = titleCase(res['Launch site'], excluded)
                res['Source'] = titleCase(res['Source'], excluded)

                return res
            }).catch((err) => {
                console.log(err)
            })
    }
}

module.exports = SatelliteData;