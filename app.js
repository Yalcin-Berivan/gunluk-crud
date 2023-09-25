const express = require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const GunlukModel=require('./gunluk.schema');
const mongoose=require('mongoose');
main().catch(err=>console.log(err));

async function main(){
  await  mongoose.connect('mongodb://127.0.0.1:27017/my-db');

// GÜNLÜKTEKİ NOTLARI GETİR:
app.get('/gunluks',async(req,res)=>{
    const gunluks=await GunlukModel.find();
    res.send(gunluks);

});
//  İD'Sİ VERİLEN GÜNLÜĞÜ GETİR:
app.get('/gunluks/:id',async(req,res)=> {
    const id=req.params.id;
 const gunluks=await GunlukModel.findById(id);
    res.send(gunluks);
 });

// GÜNLÜK OLUŞTURMA:
app.post('/gunluks',async(req,res)=>{
    const body=req.body;
    body.createdAt = new Date();
    await GunlukModel.create(body);
    res.send(body);
});

// GÜNLÜK GÜNCELLEME:
app.put('/gunluks/:id',async(req,res)=>{
    const id=req.params.id;
    const body=req.body;
    body.updatedAt = new Date();
    await GunlukModel.findOneAndUpdate({_id:id},body)
    res.send(body);
});
// GÜNLÜK SİLME
app.delete ('/gunluks/:id',async(req,res)=>{
    const id =req.params.id;
    await GunlukModel.deleteOne({_id:id})
    res.send('Kayıt silindi')
});

const port=3000;
app.listen(port,()=>{
    console.log(`sunucu ${port} portunda başlatıldı`);
});
}