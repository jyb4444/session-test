const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.use(
  session({
    name: "name", //Set the name of cookie
    secret: "keyboard cat", //The string involved in the encryption (aka signature)
    resave: false,     //Whether to re-save the session on each request
    saveUninitialized: true, //Whether to set a cookie for each request to store the session id
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/session-test"
    }),
    cookie: { 
      // secure: true,
      httpOnly: true,
      maxAge: 60 * 1000
    },
  })
)

app.get('/', (req, res) => {
  res.send('Home');
})

app.get('/login', (req, res) => {
  if(req.query.username === 'admin'){
    req.session.username = 'admin';
    req.session.uid = '258aefcccc';
    res.send('Login successfully!');
  }else{
    res.send('Login failed!');
  }
})

app.get('/cart', (req, res) => {
  console.log(req.session)
  if(req.session.username){
    res.send('Welcome to cart page!');
  }else{
    res.send('Need to login!');
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('logout successfully!')
  })
})

app.listen(80, () => {
  console.log('Running on 80 port...')
})