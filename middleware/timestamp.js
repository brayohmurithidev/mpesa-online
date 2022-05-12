const { __esModule } = require("react-offline");

const current_timestamp = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  month = month < 10 ? `0${month}` : month;
  const day = new Date().getDay();
  day = day < 10 ? `0${day}` : day;
  const hour = new Date().getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  const minute = new Date().getMinutes();
  minute = minute < 10 ? `0${minute}` : minute;
  const second = new Date().getSeconds();
  second = second < 10 ? `0${second}` : second;

  return `${year}${month}${day}${hour}${minute}${second}`;
};

module.exports = {
  timestamp: current_timestamp(),
};
