let collection = require('./collection');

module.exports = {
  preload: (content, resourcePath) => {
    if (resourcePath.match(/route-metadata\.service\.ts$/)) {
      return `
import { Injectable } from '@angular/core';
@Injectable()
export class StacheRouteMetadataService {
  public routes: any[] = ${JSON.stringify(collection.routes)};
}
`;
    }

    return content;
  }
};
