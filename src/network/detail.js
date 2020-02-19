import {request} from './request'

export function getDetail(iid) {
  return request({
    url: '/detail/detail',
    params: {
      iid
    }
  })
}

export function getRecommend(iid) {
  return request({
    url: '/detail/recommend',
    params: {
      iid
    }
  })
}

export class Goods {
  constructor(iteminfo, columns, services, priceinfo) {
    this.title = iteminfo.title
    this.desc = iteminfo.desc
    this.newPrice = priceinfo.nowPrice
    this.oldPrice = priceinfo.oldPrice
    this.discount = priceinfo.priceTags[0].text
    this.columns = columns
    this.services = services
    this.realPrice = priceinfo.highNowPrice
    this.real_iid = iteminfo.itemId
  }
}

export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParams {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
    
  }
}