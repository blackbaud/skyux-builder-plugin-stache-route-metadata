let collection = require('./collection');
const cheerio = require('cheerio');

module.exports = {
  preload: (content, resourcePath, skyPagesConfig) => {
    if (!resourcePath.match(/\.html$/)) {
      return content;
    }

    let $ = cheerio.load(content, {
      lowerCaseTags: false,
      lowerCaseAttributeNames: false,
      decodeEntities: false
    });

    let wrappers = $('stache');

    if (wrappers.length) {
      wrappers.each(function () {
        let name = $(this).attr('pageTitle');

        skyPagesConfig.runtime.routes.forEach(route => {
          let match = ['src/app', route.routePath, 'index.html'].join('/');

          if (resourcePath.endsWith(match)) {
            collection.routes.push({
              path: route.routePath,
              name: name
            });
          }
        });
      });
    }

    return content;
  }
};
