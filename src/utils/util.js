export const convertUnixToDate = (unixTime) => {
  // Timing to renew access token
  const date = new Date(unixTime * 1000);
  const year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  // if month length = 1 => plus 0 front
  // example: month = 8 => month => 08
  if (month.toString().length === 1)
      (month = '0' + month);
  if (day.toString().length === 1)
      (day = '0' + day);
  return year + "-" + month + "-" + day;
};
export const convertUnixToTime = (unixTime) => {
  // Timing to renew access token
  const date = new Date(unixTime * 1000);
  const year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  // if month length = 1 => plus 0 front
  // example: month = 8 => month => 08
  if (month.toString().length === 1) month = "0" + month;
  if (day.toString().length === 1) day = "0" + day;
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime + "  " + day + "/" + month + "/" + year + "  ";
};
export const convertUnixToDateFormat = (unixTime) => {
  // Timing to renew access token
  const date = new Date(unixTime * 1000);
  const year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  // if month length = 1 => plus 0 front
  // example: month = 8 => month => 08
  if (month.toString().length === 1) month = "0" + month;
  if (day.toString().length === 1) day = "0" + day;
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return year + "-" + month + "-" + day + "T" + formattedTime;
};

export const splitPathToGetId = (path, match) => {
  let str = path.split(match);
  str = str[str.length - 1].split("?");
  str = str[0].split("/");
  str = str[0].split("#");
  return str[0];
};
export const validateEmail = (email) => {
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(regex)) {
    return true;
  }
  return false;
};
export const checkPhone = (phone) => {
  if (phone === null || phone === undefined || phone === "") return true;
  let regex = /^[0-9]{10}$/;
  if (phone.match(regex)) {
    return true;
  }
  return false;
};
