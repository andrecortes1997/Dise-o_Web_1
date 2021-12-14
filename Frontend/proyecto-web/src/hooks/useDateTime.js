import jwt_decode from 'jwt-decode'

export const useDateTime = () => {
const currentdate = new Date();

const getExpiryDate = (token) => {
    const decodedToken = jwt_decode(token);
    return new Date(decodedToken.exp * 1000);
}

const getDatetime = (date) => {
    const datetime = 
    (date.getMonth() + 1) +
    '/' +
    date.getDate() +
    '/' +
    date.getFullYear() +
    ', ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds();
    return datetime;
  }

  return { currentdate, getExpiryDate, getDatetime }
}