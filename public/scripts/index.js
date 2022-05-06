//const { default: axios } = require('axios');
//const axios = require('axios');
//import axios from 'axios';

async function initiate_oauth() {
    console.log('initiate_oauth()');
    //const response = await axios();
    //console.log(response.request.responseURL);
    var req = XMLHttpRequest();
    req.onreadystatechange = function() {
        console.log('something');
    }
    req.open('GET', '/redirect_to_google_oauth', true);
    req.send();
}