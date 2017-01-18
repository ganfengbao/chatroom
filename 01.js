/**
 * Created by ganfengbao on 2017/1/18.
 */
var express = require('express');
var app = express();
var request = require('request');

app.set('view engine','ejs');
app.get('/',function(req,res,next){
    request('http://192.168.1.20:9096/useInterface.jspx?bexid=500203&paramKey1=commoditycode&paramValue1=&paramKey2=pageSize&paramValue2=5&paramKey3=pageNumber&paramValue3=5', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body); // Show the HTML for the Google homepage.
            res.render("zz",{
                "body":body
            });
        }
    });
});


app.listen(8000);