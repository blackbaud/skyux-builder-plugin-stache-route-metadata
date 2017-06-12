let collector = require('./collector');

const preload = (content, resourcePath) => {
  if (!resourcePath.match(/stache-extras\.module\.ts$/)) {
    return content;
  }

  let routes = collector.routes;
  if (!Array.isArray(routes)) {
    routes = [];
  }

  let moduleDirectory = '@blackbaud/stache';
  if (resourcePath.match('/stache2/')) {
    moduleDirectory = './public';
  }

  return `${content}
import {
  StacheRouteMetadataService,
  STACHE_ROUTE_METADATA_SERVICE_CONFIG
} from '${moduleDirectory}';

STACHE_EXTRAS_PROVIDERS.push(
  { provide: STACHE_ROUTE_METADATA_SERVICE_CONFIG, useValue: ${JSON.stringify(routes)} }
);
STACHE_EXTRAS_PROVIDERS.push(
  { provide: StacheRouteMetadataService, useClass: StacheRouteMetadataService }
);
`;
};

module.exports = { preload };
