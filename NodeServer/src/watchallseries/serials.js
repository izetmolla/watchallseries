const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www1.swatchseries.to/';



function seriesList(page) {

    return fetch(url + "series/" + page)
        .then(response => response.text())
        .then(body => {
            const series = [];
            const $ = cheerio.load(body);
            $('ul.listings li.category-item').each(function (i, element) {
                const $element = $(element);
                const $title = $element.find('li.category-item a.title-series');
                const $thumbnail = $element.find('img').attr("src");
                const $description = $element.find('.info .description');
                const serie = {
                    title: $title.find("b").text(),
                    published: $title.find("span.epnum").text(),
                    year: $title.text().replace($title.find("b").text(), "").replace($title.find("span.epnum").text(), "").replace(/\D/g, ""),
                    thumbnail: $thumbnail,
                    description: $description.text().replace(/\t/g, '').replace(/\n/g, ''),
                    url: $title.attr("href"),
                    ff: episodesList($title.attr("href"))

                };

                series.push(serie);
            });


            return series;
        });
}


function episodesList(page, isUrl = false) {

    return fetch(isUrl ? "https://www1.swatchseries.to/serie/" + page : page)
        .then(response => response.text())
        .then(body => {
            const seasons = [];
            const episodes = []
            const $ = cheerio.load(body);
            $('div[itemprop=season]').each(function (i, element) {
                const $element = $(element);
                const $ep = cheerio.load($element.find("ul").html())




                $ep('li').each(function (i, element) {
                    const $element = $(element);
                    const episode = {
                        title: $element.find("a").text(),
                    };

                    episodes.push(episode);
                })




                const $title = $element.find('a').attr("title");
                const season = {
                    title: 123,
                    episodes

                };

                seasons.push(season);
            });





            return seasons;
        });
}


module.exports = {
    seriesList,
    episodesList

};