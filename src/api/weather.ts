import axios from 'axios';

import { handleResponse } from './handle-response';

export async function getWeatherByCity (city: string): Promise<any> {
  return axios.get(`https://www.apiopen.top/weatherApi?city=${city}`)
    .then(handleResponse);
}
