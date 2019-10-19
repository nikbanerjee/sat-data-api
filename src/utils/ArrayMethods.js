// dependencies
const _ = require('lodash')

module.exports = {
    titleCase: function (arr, excluded = []) {
        return arr.split(' ').map((element) => {
            if (!element.match(/(\(.*?\))/g)) {
                element = element.toLowerCase()

                if (!_.includes(excluded, element)) {
                    element = element.charAt(0).toUpperCase() + element.substr(1)
                }
            }

            console.log(element)

            return element
        }).join(' ')
    }
}