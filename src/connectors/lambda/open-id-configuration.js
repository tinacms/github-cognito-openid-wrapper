const responder = require('./util/responder');
const auth = require('./util/auth');
const controllers = require('../controllers');

module.exports.handler = (event, context, callback) => {
  // pop-off /openid-configuration from resourcePath
  const resourcePath = event.requestContext && event.requestContext.resourcePath && event.requestContext.resourcePath.split('/').slice(0, -1).join('/');
  controllers(responder(callback)).openIdConfiguration(
    auth.getIssuer(
      event.headers.Host,
      event.requestContext && event.requestContext.stage,
      resourcePath,
    )
  );
};
