const cheerio = require('cheerio');

class Collector {
  constructor() {
    this.routes = [];
  }

  preload(content, resourcePath, skyPagesConfig) {
    if (!resourcePath.match(/\.html$/)) {
      return content;
    }

    const $ = cheerio.load(content, {
      lowerCaseTags: false,
      lowerCaseAttributeNames: false,
      decodeEntities: false
    });

    const wrappers = $('stache');
    const self = this;

    if (wrappers.length) {
      wrappers.each((i, element) => {
        const $wrapper = $(element);
        const preferredName = $wrapper.attr('navTitle') || $wrapper.attr('pageTitle');

        if (!preferredName) {
          return;
        }

        skyPagesConfig.runtime.routes.forEach(route => {
          const match = ['src/app', route.routePath, 'index.html'].join('/');

          if (resourcePath.endsWith(match)) {
            self.routes.push({
              path: route.routePath,
              name: preferredName
            });
          }
        });
      });
    }

    return content;
  }
}

module.exports = new Collector();
