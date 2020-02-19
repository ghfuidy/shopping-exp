// Copyright (c) 2020 82192
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {request} from './request'

export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}

export function getfeturedata(){
  return request({
    url: '/home/homemedia'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/goodsdata',
    params: {
      type,
      page
    }
  })
}