const express = require('express');
const cors = require('cors');

const serials = require('./src/watchallseries/serials');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: 'Home'
    });
});




app.get('/swatchseries/:page', (req, res) => {
    serials
        .seriesList(req.params.page)
        .then(series => {
            res.json(series);
        });
});


app.get('/swatchseries/serie/:slug', (req, res) => {
    serials
        .episodesList(req.params.slug, true)
        .then(episodes => {
            res.json(episodes);
        });
});




// app.get('/movie/:imdbID', (req, res) => {
//   scraper
//     .getMovie(req.params.imdbID)
//     .then(movie => {
//       res.json(movie);
//     });
// });

const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});