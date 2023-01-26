const WorkOS = require('@workos-inc/node');

const {
  COGNITO_REDIRECT_URI,
  WORKOS_CLIENT_ID,
  WORKOS_CLIENT_SECRET
} = require('./config');

const workos = new WorkOS.WorkOS(WORKOS_CLIENT_SECRET);

module.exports = {
  getProfile: async (accessToken) => workos.sso.getProfile({ accessToken }),
  getToken: async (code) => {
    const { access_token } = await workos.sso.getProfileAndToken({ code, clientID: WORKOS_CLIENT_ID })
    return access_token;
  },
  getAuthorizeUrl: async (client_id, state, response_type, idpMetadata) =>
    workos.sso.getAuthorizationURL({
      ...idpMetadata,
      clientID: WORKOS_CLIENT_ID,
      redirectURI: COGNITO_REDIRECT_URI,
      state,
    })
}