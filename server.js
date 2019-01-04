const express = require(`express`);
const hbs = require(`hbs`);
const fs = require(`fs`);

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + `/views/partials`);
app.set(`view engine`, `hbs`);

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile(`server.log`, log + `\n`, (err) => {
    if (err) {
      console.log(`Unable to append to server.log`);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render(`maintanance`);
// })

app.use(express.static(__dirname + `/public`));

hbs.registerHelper(`getCurrentYear`, () => new Date().getFullYear())
hbs.registerHelper(`screamIt`, (text) => text.toUpperCase())

app.get(`/`, (request, response) => {
  // response.send(`<h1>Hello Express!</h1>`);

  response.render(`home.hbs`, {
    pageTitle: `Home Page`,
    welcomeMessage: `Welcome To My Home Page!`
  });
});

app.get(`/about`, (request, response) => {
  response.render(`about.hbs`, {
    pageTitle: `About Page`,
  });
});

app.get(`/bad`, (request, response) => {
  response.send({
    errorMessage: `Unable to handle request`
  })
})

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
