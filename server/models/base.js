const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/easy_shop')
mongoose.connection.on('connected', ()=>{ console.log('mongoDB connected') })

var Schema = mongoose.Schema

const Shop = mongoose.model('shop', new  Schema({
    name:{type:String,require:true},
    ownerInfoId:{type:Schema.Types.ObjectId,require:true},
    goodsIdList:[],
    categoryIdList:[],

}))

const Owner = mongoose.model('owner', new Schema({
    name:{type:String,require:true},
    tel:{type:String,require:true},
    addr:{type:String,require:true},
    date:{type:Date,require:true},
    pswd:{type:String,require:true}
}))

const Category = mongoose.model('category', new Schema({
    name:{type:String,require:true},
    goodsIdList:[]
}))

const HomeBanner = mongoose.model('banner', new Schema({
    img:{type:String,require:true},
    type:{type:String,require:true},
    to:{type:String,require:true}
}))

const Goods = mongoose.model('goods', new Schema({
    basic:{
        desc:{type:String,require:true},
		tag:{type:String,require:true},
		price:{type:Number,require:true},
    },
    thumbnail:{type:String,require:true},
    banner:[],
    details:[]
}))

module.exports = {Owner,HomeBanner,Shop,Goods}