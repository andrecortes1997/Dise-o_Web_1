export const baseUrl = 'http://localhost:49220/api/';

export const getToken = () => localStorage.getItem("token");

export const getConfig = (token) => {
  return {headers: {Authorization: "Bearer " + token}}
}
