const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=e69782c15df7a26052aa1e4660b642e8&query=' +
    latitude +
    ',' +
    longitude +
    '&units=m';
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location. Try another search!', undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out.`
      );
    }
  });
};

module.exports = forecast;
