import express from 'express';
import 'dotenv/config';
import connection from './db/config.js';

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello Worl@@d@@!');
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  app.listen(port, () => {
    console.log(
      `WELCOME TO NOTION BREADCRUMBS API ${process.env.BASE_URL}${port}`
    );
  });
});
