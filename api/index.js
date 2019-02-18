const API = require('./api');
const schedule = require('node-schedule');

const scheduleCronstyle = () => {
  schedule.scheduleJob('0 0 */4 * * *', API.search);
};

scheduleCronstyle();
