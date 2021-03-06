
const request = require('request');
const config = require('./../config');

module.exports.getSatelliteList = (satList ,userLat, userLong) => new Promise((resolve, reject) => {

  let resolvedPromises = []  

  satList.forEach(element => {
    resolvedPromises.push(new Promise((resolve, reject) => {
      resolve(getSingleSatellite(element, userLat, userLong))
  }))});

  const result = Promise.all(resolvedPromises).then(function(resolvedPromises) {
    return resolvedPromises
  }).catch(function(err) {
    console.log("Failed to get a satellite: " + err)
    return []
  });

  return resolve(result);
})

getSingleSatellite = (satId ,userLat, userLong, userAlt) => new Promise((resolve, reject) => {

  request(`https://www.n2yo.com/rest/v1/satellite/positions/${satId}/${userLat}/${userLong}/${userAlt}/${config.NUMBER_OF_FRAMES}&apiKey=${config.N2YO_API_KEY}`, function (err, response, body) {
    if (err) return reject(err);
    if (response.statusCode === 200) {
      const jsonBody = JSON.parse(body)

      if (jsonBody["info"]["satid"] === 0) {
        return reject(new Error('Response from n2yo was not 200.'))
      }

      let respJson = {};
      respJson['satName'] = jsonBody['info']['satname'];
      respJson['satId'] = jsonBody['info']['satid'];
      respJson['positions'] = [];
      respJson['positions'].push(jsonBody['positions'][jsonBody['positions'].length - 1])
      
      let numOfTimes = parseInt(config.NUMBER_OF_FRAMES, 10) / parseInt(config.REFRESH_EVERY_X_FRAMES, 10);
      
      while (numOfTimes > 0) {
        numOfTimes--
        respJson['positions'].push(jsonBody['positions'][numOfTimes * config.REFRESH_EVERY_X_FRAMES])
      }
      return resolve(respJson);
    } else {
      return reject(new Error('Response from n2yo was not 200.'));
    }
  });
})