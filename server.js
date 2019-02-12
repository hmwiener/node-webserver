const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('serverlog.txt', log + '\n', (err) => {
    if (err) {
      console.log('Can\'t append to server log file');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maint.hbs', {
//     pageHeaderName: 'Under Maintenance Page',
//     pageTitle: 'Working on it . . . '
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express.</h1>');
    // res.send({
    //   name: 'Howard',
    //   Likes: [
    //     'Crosswords',
    //     'Britcoms',
    //     'Blues'
    //   ]
    // });
    res.render('home.hbs', {
      pageHeaderName: 'Home page',
      welcomeMsg: 'Hi and welcome to my fucking web page!',
      pageTitle: 'My Home Page'
    })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageHeaderName: 'Aboot page',
    pageTitle: 'About Page Injected'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errTitle: 'Uh oh!',
    errMsg: 'This is what happens when you don\'t listen'
  });
});
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});