import axios from 'axios';
import pushover from '../../pushover'

const instance = axios.create();

instance.interceptors.response.use(function (response: any) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    pushover.push(`Twitch API ${error.response.status} error\n${error.request.url}`)
  }
  return Promise.reject(error);
});

export default instance;
