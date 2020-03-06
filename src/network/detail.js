import {request} from "./request.js"
// 详情页的数据请求
export function getDetail(iid) {
    return request({
        url: "/detail",
        params: {
            iid
        }
    })
}

// 详情产品推荐数据
export function getRecommand() {
    return request({
        url: "/recommend"
    })
}

// 详情页商品描述混乱数据的整合：(收集到一个对象中)
export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}
export class Shop {
    constructor(ShopInfo) {
        this.logo = ShopInfo.shopLogo;
        this.name = ShopInfo.name;
        this.fans = ShopInfo.cFans;
        this.sells = ShopInfo.cSells;
        this.score = ShopInfo.score;
        this.goodsCount = ShopInfo.cGoods;
    }
}