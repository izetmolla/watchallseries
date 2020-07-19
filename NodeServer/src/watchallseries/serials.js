const fetch = require('node-fetch');
const cheerio = require('cheerio');

const mainURL = 'https://www1.swatchseries.to/';



function seriesList(page) {
    return fetch(mainURL + "series/" + page)
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
                    import_slug: $title.attr("href").replace(mainURL + 'serie/', ""),
                    import_website: 'swatchallseries'
                };

                series.push(serie);
            });
            return series;
        });
}


function episodesList(slug) {
    return fetch(mainURL + 'serie/' + slug)
        .then(response => response.text())
        .then(body => {
            const episodes = []
            const $ = cheerio.load(body);
            $('.fullwrap div[itemprop="season"]').each(function (seasonIndex, element) {
                const $element = $(element);
                const $ep = cheerio.load($element.find('ul.listings').html())
                $ep('li').each(function (i, element) {
                    const $EPelement = $(element);
                    const episode = Number($EPelement.find("a span[itemprop=name]").text().split(" ")[1].replace(/\D/g, ''))
                    const title = $EPelement.find("a span[itemprop=name]").text()
                    const serie = {
                        title: title.replace("Episode " + episode, "").replace(/\s+/g, ' ').trim(),
                        season: Number($element.find("h2.lists a[itemprop='url'] span").text().replace(/\D/g, '')),
                        episode,
                        posted: $EPelement.find("a span[itemprop=datepublished]").text().replace(/\s+/g, ' ').trim(),
                        links: Number($EPelement.find("a span.epnum b").text().replace(/\s+/g, ' ').replace(/\D/g, '')),
                        import_slug: $EPelement.find("a").attr("href").replace(mainURL + 'episode/', ""),
                        import_website: 'swatchallseries'
                    };
                    episodes.push(serie);
                })
            });
            return {
                details: {
                    title: null,
                    description: null,
                    genre: []
                },
                episodes
            };
        });
}


function linksList(slug) {
    return fetch(mainURL + 'episode/' + slug)
        .then(response => response.text())
        .then(body => {

            const series = [];
            const $ = cheerio.load(body);

            $('#linktable table#myTable tr').each(function (i, element) {
                const serie = {}
                const $element = $(element);
                const $title = $element.find('td span.host')
                const $link = $element.find("td a.watchlink").attr("href").replace(mainURL + "freecale.html?r=", "")


                regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                if (!regexp.test($link)) {
  
                
                    series.push({
                        host: $title.text().trim(),
                        url: $element.find("td a.watchlink").attr("href").replace(mainURL + "freecale.html?r=", "")
                    });
                }




                // series.push(serie);
            });
            return series;



        });
}

module.exports = {
    seriesList,
    episodesList,
    linksList

};