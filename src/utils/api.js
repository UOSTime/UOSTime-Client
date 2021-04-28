/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useShowPopup } from '@components/Popup';

const { API_URL_BASE } = process.env;

const makeAPI = (method, path) => (initialBody = {}) => {
  const API = {
    ...method(path),
    data: initialBody,

    setPathParam: (...pathParams) => {
      API.url += ['', ...pathParams].join('/');
      return API;
    },

    setQuery: queries => {
      const queryStr = Object.entries(queries)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

      API.url = `${API.url}?${queryStr}`;
      return API;
    },

    setBody: body => {
      API.data = body;
      return API;
    },
  };

  return API;
};

// API CONFIG OBJECT
const GET = url => ({ method: 'GET', url });
const POST = url => ({ method: 'POST', url });
const PUT = url => ({ method: 'PUT', url });
const PATCH = url => ({ method: 'PATCH', url });
const DELETE = url => ({ method: 'DELETE', url });

// API CONFIG LIST
export const API_LOGIN = makeAPI(POST, '/user/login');
export const API_GET_SEMESTERS = makeAPI(GET, '/semesters');
export const API_GET_ALL_NOTICES = makeAPI(GET, '/notice/all');
export const API_CREATE_NOTICE = makeAPI(POST, '/notice');
export const API_UPDATE_NOTICE = makeAPI(PATCH, '/notice');
export const API_DELETE_NOTICE = makeAPI(DELETE, '/notice');
export const API_GET_ALL_LECTURES = makeAPI(GET, '/lecture');
export const API_CREATE_TIMETABLE = makeAPI(POST, '/timetable');
export const API_DELETE_TIMETABLE = makeAPI(DELETE, '/timetable');
export const API_PATCH_TIMETABLE_NAME = makeAPI(PATCH, '/timetable/name');
export const API_GET_TIMETABLES = makeAPI(GET, '/timetable');
export const API_DELETE_TLECTURE = makeAPI(DELETE, '/timetable/tlecture');
export const API_ADD_TLECTURE = makeAPI(POST, '/timetable/tlecture');
export const API_UPDATE_LECTURES = makeAPI(PATCH, '/lecture');
export const API_GET_HISTORIES = makeAPI(GET, '/history');

const axiosInstance = axios.create({
  baseURL: `${API_URL_BASE}/api`,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  },
  error => {
    console.error(error);
    useShowPopup('에러', '서버를 찾을 수 없어요...');
    return null;
  },
);

axiosInstance.interceptors.response.use(
  config => config,
  error => Promise.resolve(error.response),
);

export async function requestAPI(apiConfig, data) {
  const config = {
    url: apiConfig.url,
    method: apiConfig.method,
    data: data || apiConfig.data,
  };

  try {
    const response = await axiosInstance.request(config);

    // for test
    console.log(response);

    // includes 3xx, 4xx responses
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
