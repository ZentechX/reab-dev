var express = require('express');
var app = express();
const request = require('request-promise');





app.get('/', function(req, res) {
  res.send('test')

});
app.get('/queryString:queryString' , function (req,res) {
var qs = req.params.queryString;

var qs_off = qs.replace(/=/gi, '');

  console.log(qs_off);

  var options = {
      uri: 'https://api.wit.ai/message?v=04/07/2017&q='+qs_off,

      headers: {
          'Authorization': 'Bearer DGYLJMBA42AIQRV4IE4WF2TIIZWVAYJV'
      },

  };

  request(options)
      .then(function (body) {
        var jsonResponse = [];
          var obj = JSON.parse(body);
          console.log(obj.entities);
          console.log(obj.entities.house_search[1].value);

          if(obj.entities.greetings[0].value){
            jsonResponse.push({"text": "Welcome to the Chatfuel Rockets!"})
          }
          else if (obj.entities.house_search[1].value == 'rooms'){
            jsonResponse.push({ "text": "Here is the list for a "+obj.entities.house_search[0].value+ " with "+obj.entities.number[0].value+" "+obj.entities.house_search[1].value },
            {
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"generic",
              "elements":[
                {
                  "title":"Chatfuel Rockets T-Shirt",
                  "image_url":"http://i.imgur.com/xdZtHCU.jpg",
                  "subtitle":"Soft white cotton t-shirt with CF Rockets logo",
                  "buttons":[
                    {
                      "type":"web_url",
                      "url":"https://rockets.chatfuel.com/store/shirt",
                      "title":"View Item"
                    }
                  ]
                },
                {
                  "title":"Chatfuel Rockets Hoodie",
                  "image_url":"http://i.imgur.com/nT7IgSY.jpg",
                  "subtitle":"Soft grey cotton hoddie with CF Rockets logo",
                  "buttons":[
                    {
                      "type":"web_url",
                      "url":"https://rockets.chatfuel.com/store/hoodie",
                      "title":"View Item"
                    }
                  ]
                }
              ]
            }
          }
        });
          }
          else{
            jsonResponse.push({"text": "I am still learning everyday"})
          }






           res.send(jsonResponse);
      })
      .catch(function (err) {
          console.log(err);
      });


});



app.listen(3000, function() {
    console.log('Chatfuel Bot-Server listening on port 80...');
});



// { msg_id: '0QoQnWO5n2auoz8at',
//   _text: 'I am looking for a house with 5 rooms',
//   entities: { house_search: [ [Object], [Object] ], number: [ [Object] ] } }

// { house_search:
//    [ { confidence: 0.95212316012944, value: 'house', type: 'value' },
//      { confidence: 0.92564296154643, value: 'rooms', type: 'value' } ],
//   number: [ { confidence: 1, value: 5, type: 'value' } ] }
