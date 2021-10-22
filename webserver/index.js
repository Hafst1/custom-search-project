const express = require('express');
const { google } = require('googleapis');
const app = express();
const cors = require('cors');
const port = 3000;
const customsearch = google.customsearch('v1');
const cx = '001361074102112665899:p7mybnrloug';

const dotenv = require('dotenv');
dotenv.config();
const API_KEY = `${process.env.API_KEY}`;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/search', (req, res) => {
  const { q, start } = req.query;
  customsearch.cse.list({
		key: API_KEY,
		cx: cx,
    start: start,
		q
	}).then(result => result.data)
  .then((result) => {
    const response = {
      q,
      items: result.items.map(o => ({
        link: o.link,
        title: o.title,
        img: (((o.pagemap || {}).cse_image || {})[0] || {}).src,
        imgThumbnail: (((o.pagemap || {}).cse_thumbnail || {})[0] || {}).src
      }))
    }
    res.status(200).send(response);
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});