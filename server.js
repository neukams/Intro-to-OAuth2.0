const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const client_creds = require('./client_secret.apps.googleusercontent.com.json');
const axios = require('axios');

app.enable('trust proxy');
app.use(bodyParser.json());
app.use(express.static('./'))

const redirect_uri = 'https://accounts.google.com/o/oauth2/v2/auth'

router.get('/', async function(req, res) {
    
    // redirecting user to Google's oauth portal
    res.sendFile('./index.html');
    
});


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
