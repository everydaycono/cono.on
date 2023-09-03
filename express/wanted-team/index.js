import express from 'express';

import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello Worl@@d@@!');
});

app.listen(port, () => {
  console.log(
    `WELCOME TO NOTION BREADCRUMBS API ${process.env.BASE_URL}${port}`
  );
});
