const axios = require('axios');

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}


async function post_to_google(client_creds, request_code) {
    // POST to google servers

    try {
        var response = await axios(
            {
                method: 'POST',
                headers: headers,
                url: 'https://oauth2.googleapis.com/token',
                data: {
                    code: request_code,
                    client_id: client_creds.web.client_id,
                    client_secret: client_creds.web.client_secret,
                    redirect_uri: process.env.LOCAL_SPENCER || client_creds.web.redirect_uris[0],
                    grant_type: 'authorization_code'
                }
            }
        );
    } catch (err) {
        console.log('Error sending POST to google server to get auth token');
        console.log(err)
    }

    return response;
}

async function get_data(response) {

    try {
        var response = await axios({
            method: 'GET',
            url: 'https://people.googleapis.com/v1/people/me?personFields=names',
            headers: {
                "Accept": "application/json",
                "Authorization": response.token_type + ' ' + response.access_token
            }
        });
    } catch (err) {
        console.log('Error getting person data');
        console.log(err);
    }

    return response;
}

module.exports = {
    post_to_google,
    get_data
}