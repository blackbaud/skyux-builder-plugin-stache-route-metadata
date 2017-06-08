let collector = require('./collector');

const preload = (content, resourcePath) => {
  if (!resourcePath.match(/stache-extras\.module\.ts$/)) {
    return content;
  }

  let routes = collector.routes;

  if (!Array.isArray(routes)) {
    routes = [];
  }

  return `
import {
  STACHE_ROUTE_METADATA_SERVICE_CONFIG_TOKEN,
  STACHE_ROUTE_METADATA_PROVIDERS
} from '@blackbaud/stache';

STACHE_ROUTE_METADATA_PROVIDERS.push({
  provide: STACHE_ROUTE_METADATA_SERVICE_CONFIG_TOKEN,
  useValue: ${JSON.stringify(routes)}
});

${content}`;
};

module.exports = { preload };
