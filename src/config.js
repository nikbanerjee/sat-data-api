// load environment variables
require('dotenv').config();
const url = 'https://icp4i-devcamp-one-master.fyre.ibm.com:8443/';
const helm_api_url = url + 'helm-api/api/v2/';

module.exports = {
  PORT: process.env.PORT,
  USERNAME: process.env.ICP4I_USERNAME,
  PASSWORD: process.env.ICP4I_PASSWORD,
  SERVER_CERT: process.env.SERVER_CERT,
  SERVER_KEY: process.env.SERVER_KEY,
  HELM_API_TOKEN: url + 'v1/auth/identitytoken',
  HELM_API_POST_RELEASE: helm_api_url + 'releases',
  HELM_API_GET_RELEASE: helm_api_url + 'releases/'
};
