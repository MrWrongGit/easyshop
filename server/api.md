# 主页
# banner  
{

}

## 获取主页banner
GET http://api.easyshop.com/V1/:shop_id/home/banner  
返回   
{

}

## 修改主页banner
PUT http://api.easyshop.com/V1/:shop_id/home/banner  
返回   
{

}

# shortcuts
{

}
## 获取快捷方式
GET http://api.easyshop.com/V1/:shop_id/home/shortcuts   
返回   
{
    
}

## 修改

# 热门分类列表
GET http://api.easyshop.com/V1/:shop_id/home/category_list   
返回
{
    category_id: [
        category_id_a,
        category_id_b,
        category_id_c
    ]
}

# 获取分类信息
GET http://api.easyshop.com/V1/:shop_id/:category_id?limit=8  

GET http://api.easyshop.com/V1/:shop_id/:category_id?limit=8&&offset=16





# 上传商品虐缩图
//POST http://api.easyshop.com/goods/thumbnail/:g_id/:shop_id/
#上传商品
POST http://api.easyshop.com/goods/:shop_id/