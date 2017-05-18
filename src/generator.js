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
  public routes: any[] = ${JSON.stringify(routes)};
}
`;
  }

  return content;
};

module.exports = {
  preload
};
