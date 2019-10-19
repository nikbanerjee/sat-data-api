// load environment variables
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  N2YO_API_KEY: process.env.N2YO_API_KEY,
  NUMBER_OF_FRAMES: process.env.NUMBER_OF_FRAMES,
  REFRESH_EVERY_X_FRAMES: process.env.REFRESH_EVERY_X_FRAMES
};
