const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address provided!',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Dalibor',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Dalibor',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'My problem message',
    title: 'Help',
    name: 'Dalibor',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Dalibor',
    errorMessage: 'Help article not found!',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Dalibor',
    errorMessage: 'Page is not found!',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
