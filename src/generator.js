let collector = require('./collector');

const preload = (content, resourcePath) => {
  if (resourcePath.match(/route-metadata\.service\.ts$/)) {
    let routes = collector.routes;

    if (!routes || !routes.pop) {
      routes = [];
    }

    return `
import { Injectable } from '@angular/core';

@Injectable()
export class StacheRouteMetadataService {
  /* tslint:disable */
  public routes: any[] = ${JSON.stringify(routes)};
  /* tslint:enable */
}
`;
  }

  return content;
};

module.exports = {
  preload
};
