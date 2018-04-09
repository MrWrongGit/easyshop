const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/easy_shop')
mongoose.connection.on('connected', ()=>{ console.log('mongoDB connected') })

const Ownner = mongoose.model('ownner', new mongoose.Schema({
    name:{type:String,require:true},
    tel:{type:String,require:true},
    addr:{type:String,require:true},
    date:{type:String,require:true},
    pswd:{type:String,require:true}
}))

const HomeBanner = mongoose.model('banner', new mongoose.Schema({
    img:{type:String,require:true},
    type:{type:String,require:true},
    to:{type:String,require:true}
}))

module.exports = {Ownner,HomeBanner}