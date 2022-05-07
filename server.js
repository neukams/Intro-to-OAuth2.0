const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const client_creds = require('./client_secret.apps.googleusercontent.com.json');
const axios = require('axios');
require('dotenv').config();

app.enable('trust proxy');
app.use(bodyParser.json());
app.use(express.static('./'));

const redirect = client_creds.web.auth_uri;
const q = '?';
const response_type = 'response_type=code';
const ap = '&';
const client_id = 'client_id=' + client_creds.web.client_id;
const redirect_uri = 'redirect_uri=' + process.env.LOCAL_SPENCER || client_creds.web.redirect_uris[0];
const scope = 'scope=profile';
const state = randStateGenerator();

const google_oauth = redirect + q + response_type + ap + client_id + ap + redirect_uri + ap + scope;
var state_list = ['example_state_string'];

// STARTUP VALIDATION
//console.log(redirect_uri);
//console.log(client_creds.web.redirect_uris[1]);
//console.log(state);
//console.log(google_oauth);
//console.log(google_oauth + ap + 'state=' + state);
//console.log('does the state function work?');
//console.log(validState('example_state_string'));

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

/******************************
 * Utils
 ******************************/

function randStateGenerator() {
    return getRandString() + getRandString();
}

function getRandString() {
    return (Math.random() + 1).toString(36).substring(2);
}

function validState(received_state) {
    for (i=0; i< state_list.length; i++) {
        if (state_list[i] == received_state) {
            return true;
        }
    }
    return false;
}

/******************************
 * Route handlers
 ******************************/

router.get('/', async function(req, res) {
    console.log('GET /');
    res.status(200).sendFile('./index.html');
});

router.post('/redirect_to_google_oauth', async function(req, res) {
    console.log('GET /redirect_to_google_oauth');
    const location = google_oauth + ap + 'state=' + state;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({"url": location});
});

router.get('/oauth', async function(req, res) {
    console.log('GET /oauth')
    console.log('Received response from Google server');

    // Send POST to Google Server verifying State & Code
    if (validState(req.query.state)) {
        
        
        var response = await fetch('<validate link in documentation>', {
            method: 'POST',
            headers: headers,
            body: {
                code: req.query.code,
                client_id: client_creds.web.client_id,
                client_secret: client_creds.web.client_secret,
                redirect_uri: process.env.LOCAL_SPENCER || client_creds.web.redirect_uris[0],
                grant_type: 'authorization_code'
            }
        });
    
        var res_json = await response.json();     
    }
});

/*router.something ('/oath')

*/


/*******************************
    BOATS
*******************************/

/*

router.post('/boats', async function(req, res) {
    console.log('POST /boats');
    return await req_handler.post_boat(req, res);
});

router.get('/boats/:id', async function(req, res) {
    console.log('GET /boats/:id');
    return await req_handler.get_boat(req, res);
});

router.patch('/boats/:id', async function(req, res) {
    console.log('PATCH /boats/:id');
    return await req_handler.patch_boat(req, res);
});

router.put('/boats/:id', async function(req, res) {
    console.log('PUT /boats/:id');
    return await req_handler.put_boat(req, res);
});

router.delete('/boats/:id', async function(req, res) {
    console.log('DELETE /boats/:id');
    return await req_handler.delete_boat(req, res);
}); */

/*******************************
    Invalid Route Requests
*******************************/

/*
router.put('/boats', async function(req, res) {
    console.log('PUT /boats');
    res.status(405).set('Allow', 'POST, GET').send({"Error": "Method Not Accepted"});
});

router.delete('/boats', async function(req, res) {
    console.log('DELETE /boats');
    res.status(405).set('Allow', 'POST, GET').send({"Error": "Method Not Accepted"});
});
*/


app.use(router);

// Listening on port ...
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

module.exports = app;
