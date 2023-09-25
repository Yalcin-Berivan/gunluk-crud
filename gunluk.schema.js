const mongoose=require("mongoose");
const Gunluk=new mongoose.Schema({
    title:String,
    content:String,
    date:Date,
    createdAt:Date,
    updatedAt:Date,
    pageNo:Number
});
const GunlukModel=mongoose.model('Gunluk',Gunluk);
module.exports=GunlukModel;
