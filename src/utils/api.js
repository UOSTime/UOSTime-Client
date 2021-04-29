/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import axios from 'axios';


const { API_URL_BASE } =  process.env;

const makeAPI = (method, path) => {
  return () => {
    const METHOD = method(path);

    const API = {
      ...METHOD,
      data: {},

      setPathParam: (...pathParams) => {
        const pathVars = pathParams.map(param => `/${param}`)
                  .reduce((acc, cur) => acc + cur);
    
        API.url += pathVars;
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
      }
    }

    return API;
  }
}

// API CONFIG OBJECT
const GET = url => ({ method: 'GET', url });
const POST = url => ({ method: 'POST', url });
const PUT = url => ({ method: 'PUT', url });
const PATCH = url => ({ method: 'PATCH', url });
const DELETE = url => ({ method: 'DELETE', url });


// API CONFIG LIST

export const API_LOGIN = makeAPI(POST, '/user/login');
export const API_SIGN_UP = makeAPI(POST, '/user');
export const API_FIND_ID = makeAPI(GET, '/user/id');
export const API_FIND_PW = makeAPI(GET, '/user/password');
export const API_GET_SEMESTERS = makeAPI(GET, '/semesters');
export const API_GET_SEMESTER = makeAPI(GET, '/semester');
export const API_GET_ALL_NOTICES = makeAPI(GET, '/notice/all');
export const API_CREATE_NOTICE = makeAPI(POST, '/notice');
export const API_UPDATE_NOTICE = makeAPI(PATCH, '/notice');
export const API_DELETE_NOTICE = makeAPI(DELETE, '/notice');
export const API_FIND_CHATROOM = makeAPI(GET, '/chatRoom');
export const API_FIND_CHATROOMS = makeAPI(GET, '/chatRoom');
export const API_GET_MESSAGES = makeAPI(GET, '/chatRoom/messages');
export const API_GET_POINTS = makeAPI(GET, '/chatRoom/points');
export const API_GET_ALL_LECTURES = makeAPI(GET, '/lecture');
export const API_UPDATE_LECTURES = makeAPI(PATCH, '/lecture');
export const API_GET_HISTORIES = makeAPI(GET, '/history');



const axiosInstance = axios.create({
  baseURL: `${API_URL_BASE}/api`,
  timeout: 20000
});

axiosInstance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token');
    if(token) {
      config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
  },
  error => {
    console.error(error);

    alert('서버를 찾을 수 없어요...');
    return null
  }
)

axiosInstance.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    const failResponse = error.response;
    return Promise.resolve(failResponse);
  }
)

export async function requestAPI(apiConfig, data) {
  const config = {
    url: apiConfig.url,
    method: apiConfig.method,
    data: data ? data : apiConfig.data
  };
  try{
    const response = await axiosInstance.request(config);

    // for test
    console.log(response);

    // includes 3xx, 4xx responses
    return response;
  } catch (error) {
    console.error('Error', error);
    
    return null;
  }
}
