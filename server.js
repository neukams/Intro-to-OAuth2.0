const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const client_creds = require('./client_secret.apps.googleusercontent.com.json');
require('dotenv').config();

const oauth_supp = require('./oauth_support.cjs');
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

const google_oauth = redirect + q + response_type + ap + client_id + ap + redirect_uri + ap + scope;
var state_list = ['example_state_string'];


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
            console.log('valid query state');
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
    const state = randStateGenerator();
    const location = google_oauth + ap + 'state=' + state;
    state_list.push(state);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({"url": location});
});

router.get('/oauth', async function(req, res) {
    console.log('GET /oauth')
    console.log('Received response from Google server');

    // if State matches what we generated for the user from GET /redirect_to_google_oauth
    // Google Server responds with the information we requested.
    if (validState(req.query.state)) {
        
        var response = await oauth_supp.post_to_google(client_creds, req.query.code);
        console.log(response);
        console.log('/-------------/n\n\n\n\n\n\n\n')
        console.log(response.data.token_type);
        console.log(response.data.access_token);

        var user_data = await oauth_supp.get_data(response.data);
        console.log('received user data?');
        console.log(user_data.data.names);

        var response = '<pre>Hello TA Tester person.<br/><br/><br/>Display Name:     ' + user_data.data.names[0].displayName + '<br><br>Family Name:      ' + user_data.data.names[0].familyName + '<br><br>givenName:        ' + user_data.data.names[0].givenName + '<br><br>state:            ' + req.query.state + '</pre>';
        res.status(200).send(response);
        return;
    }
});


app.use(router);

// Listening on port ...
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

module.exports = app;
