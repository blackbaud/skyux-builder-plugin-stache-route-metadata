let collector = require('./collector');

const preload = (content, resourcePath) => {
  if (resourcePath.match(/public\/src\/modules\/shared\/route-metadata\.service\.ts$/)) {
    let routes = collector.routes;

    if (!Array.isArray(routes)) {
      routes = [];
    }

    // (Disabling TSLint for the `routes` line because the file contents does not conform
    // to linting rules.)
    return `
import { Injectable } from '@angular/core';

@Injectable()
export class StacheRouteMetadataService {
  /* tslint:disable:quotemark whitespace */
  public routes: any[] = ${JSON.stringify(routes)};
  /* tslint:enable:quotemark whitespace */
}
`;
  }

  return content;
};

module.exports = {
  preload
};
