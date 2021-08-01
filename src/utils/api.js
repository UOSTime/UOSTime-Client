/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import usePopup from '@components/usePopup';

const { API_URL_BASE } = process.env;

const makeConfig = ({ method, url }) => (initialData = {}) => {
  const config = {
    method,
    url,

    setPath: (...path) => {
      config.url += ['', ...path].join('/');
      return config;
    },

    setData: data => {
      if (method === 'GET') {
        config.params = data;
      } else {
        config.data = data;
      }
      return config;
    },
  };

  return config.setData(initialData);
};

// API CONFIG OBJECT
const GET = url => ({ method: 'GET', url });
const POST = url => ({ method: 'POST', url });
const PUT = url => ({ method: 'PUT', url });
const PATCH = url => ({ method: 'PATCH', url });
const DELETE = url => ({ method: 'DELETE', url });

// API CONFIG LIST
export const API_LOGIN = makeConfig(POST('/user/login'));
export const API_GET_SEMESTER = makeConfig(GET, '/semester');
export const API_GET_SEMESTERS = makeConfig(GET('/semesters'));
export const API_GET_ALL_NOTICES = makeConfig(GET('/notice/all'));
export const API_CREATE_NOTICE = makeConfig(POST('/notice'));
export const API_UPDATE_NOTICE = makeConfig(PATCH('/notice'));
export const API_DELETE_NOTICE = makeConfig(DELETE('/notice'));
export const API_GET_ALL_LECTURES = makeConfig(GET('/lecture'));
export const API_UPDATE_LECTURES = makeConfig(PATCH('/lecture'));
export const API_DELETE_TLECTURE = makeConfig(DELETE('/timetable/tlecture'));
export const API_ADD_TLECTURE = makeConfig(POST('/timetable/tlecture'));
export const API_CREATE_TIMETABLE = makeConfig(POST('/timetable'));
export const API_DELETE_TIMETABLE = makeConfig(DELETE('/timetable'));
export const API_GET_TIMETABLES = makeConfig(GET('/timetable'));
export const API_PATCH_TIMETABLE_NAME = makeConfig(PATCH('/timetable/name'));
export const API_GET_HISTORIES = makeConfig(GET('/history'));
export const API_SIGN_UP = makeConfig(POST('/user'));
export const API_FIND_ID = makeConfig(GET('/user/id'));
export const API_FIND_PW = makeConfig(GET('/user/password'));

const axiosInstance = axios.create({
  baseURL: `${API_URL_BASE}/api`,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    const [, showPopup] = usePopup();
    console.error(error);
    showPopup('에러', '서버를 찾을 수 없어요...');
    return null;
  },
);

axiosInstance.interceptors.response.use(
  config => config,
  error => Promise.resolve(error.response),
);

export async function requestAPI(config) {
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

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}
