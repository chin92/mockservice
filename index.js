const express=require('express')
const app=express()
const port=4000
var fs= require('fs');
var obj;

app.listen(port,()=>{
    console.log(`App listening at ${port}`)
})

app.get('/',(req,res)=>{
    res.status(200);
    res.send('Application Running');
})

app.get('/datasource',(req,res)=>{
    var authHeader = req.get('Authorization');
    console.log(authHeader);

    if(authHeader=="Basic YWRtaW46YWRtaW4="){
        if(req.query.updated==='true'){
            fs.readFile('data-updated.json','utf8',function(err,data){
                if(err) throw err;
                obj=JSON.parse(data);
                res.status(200);
                res.contentType('application/json');
                res.send(JSON.stringify(obj));
            });
        } else {
            if(req.query.updated==='false'){
                fs.readFile('data.json','utf8',function(err,data){
                    if(err) throw err;
                    obj=JSON.parse(data);
                    res.status(200);
                    res.contentType('application/json');
                    res.send(JSON.stringify(obj));
                });
            }
        }
    }else{
        res.status(401);
        res.send('Request Unauthorized');
    }
});