//const { default: axios } = require('axios');
//const axios = require('axios');
//import axios from 'axios';

console.log('am I getting the new file? v8');

document.getElementById('oauth-form').addEventListener('submit', function(event){
    event.preventDefault()
    initiate_oauth();
});

async function initiate_oauth(url) {
    console.log('initiate_oauth()');

    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    var response = await fetch('/redirect_to_google_oauth', {
        method: 'POST',
        headers: headers,
        mode: 'no-cors',
        body: {}
    });

    var res_json = await response.json();
    setTimeout(() => {console.log(res_json['url'])}, 5000);
    window.location = res_json['url'];
}