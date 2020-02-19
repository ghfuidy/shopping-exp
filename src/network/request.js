// Copyright (c) 2020 82192
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000
  })

  instance.interceptors.response.use(res => {
    // console.log(res);
    return res
  }, err => {
    // console.log(err);
    
  })

  return instance(config)
}