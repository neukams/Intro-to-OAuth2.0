/*
    This file handles all db interactions
*/

const projectId = 'assignment-6-oauth-2';
const {Datastore} = require('@google-cloud/datastore');
const { entity } = require('@google-cloud/datastore/build/src/entity');
const datastore = new Datastore({projectId:projectId});
const BOAT = 'State';
const utils = require('./utils');


/*******************************
    DATASTORE STUFF
*******************************/

function fromDatastore(item) {
    item.id = Number(item[Datastore.KEY].id);
    delete item[Datastore.KEY];
    return item;
}

/*
function fromDatastoreArr(arr) {
    return arr.map((i) => fromDatastore(i));
}
*/

/*******************************
    BOATS
*******************************/

async function createState(state_string) {
    console.log('db.js -> createBoat()');

    const key = datastore.key(BOAT);
    var state = {state: state_string};

    try {
        await datastore.save({"key": key, "data": state});
        state.id = Number(key.id);
    } catch (err) {
        utils.logErr(err);
        return {};
    }

    console.log(key);
    console.log(state);
    
    return state;
}

async function getState(state_string) {
    console.log('getBoat()');
    var state;
    const query = datastore.createQuery(BOAT);
    query.filter('state', state_string);
    state = await datastore.runQuery(query);
    state = state[0];

    if (utils.isEmpty(state)) {
        return {};
    }
    
    return fromDatastore(state[0]);
}

/*******************************
    RESOURCE AGNOSTIC
*******************************/

async function deleteResource(collection, state_string) {
    console.log('deleteResource(collection, resource)');
    console.log('collection=' + collection);
    console.log('state_string=' + state_string);

    var resource = await getState(state_string);
    
    const key = datastore.key([collection, resource.id]);
    const transaction = datastore.transaction();

    try {
        await transaction.run();
        await transaction.delete(key);
        await transaction.commit();
    } catch (err) {
        utils.logErr(err);
        return false;
    }
    return true;
}


module.exports = {
    createState,
    getState,
    deleteResource
}
