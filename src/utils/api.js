/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */

import axios from 'axios';

// const { API_URL_BASE } = process.env;
const API_URL_BASE = 'http://localhost:2021';

// API CONFIG OBJECT
const GET = path => ({ method: 'GET', path });
const POST = path => ({ method: 'POST', path });
const PUT = path => ({ method: 'PUT', path });
const PATCH = path => ({ method: 'PATCH', path });
const DELETE = path => ({ method: 'DELETE', path });

// API CONFIG LIST
export const API_LOGIN = POST('/user/login');
export const API_FIND_ID = GET('/user/id');
export const API_FIND_PW = GET('/user/password');
export const API_GET_SEMESTERS = GET('/semesters');
export const API_GET_ALL_NOTICES = GET('/notice/all');
export const API_CREATE_NOTICE = POST('/notice');
export const API_UPDATE_NOTICE = PATCH('/notice');
export const API_DELETE_NOTICE = DELETE('/notice');

export async function requestAPI(apiConfig, data) {
  const config = {
    url: `${API_URL_BASE}/api${apiConfig.path}`,
    method: apiConfig.method,
    data,
  };

  try {
    const response = await axios(config);

    // for test
    console.log(response.data);

    return response.data;
  } catch (error) {
    // TODO: handle error user-friendly
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    return null;
  }
}
