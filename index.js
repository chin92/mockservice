const express=require('express')
const app=express()
const port=3000

var fs=require('fs');
var obj;

app.listen(port,()=>{
    console.log(`App listening at ${port}`)
})

app.get('/',(req,res)=>{

    fs.readFile('data.json','utf8',function(err,data){
        if(err) throw err;
        obj=JSON.parse(data);
    });

    res.send(JSON.stringify(obj));
})