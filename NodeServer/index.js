const express = require('express');
const cors = require('cors');

const serials = require('./src/watchallseries/serials');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        home: '/',
        watchallseries: {
            list: "https://import.watchallseries.co/swatchseries/1",
            serie: "https://import.watchallseries.co/swatchseries/serie/dark",
            episode: "https://import.watchallseries.co/swatchseries/episode/dark_s3_e8.html",
        }

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
        .episodesList(req.params.slug)
        .then(episodes => {
            res.json(episodes);
        });
});



app.get('/swatchseries/episode/:slug', (req, res) => {
    serials
        .linksList(req.params.slug)
        .then(links => {
            res.json(links);
        });
});



const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});