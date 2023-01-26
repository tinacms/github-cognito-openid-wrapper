const logger = require('../logger');
const responder = require('./util/responder');
const controllers = require('../controllers');

module.exports.handler = (event, context, callback) => {
  logger.debug(event.queryStringParameters)
  logger.debug(event.requestContext)
  const {
    client_id,
    scope,
    state,
    response_type
  } = event.queryStringParameters;

  controllers(responder(callback)).authorize(
    client_id,
    scope,
    state,
    response_type
  );
};
