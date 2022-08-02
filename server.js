const express = require('express');
const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
const {v4: uuidv4} = require('uuid');
const {SECRET_KEY, KNEX_CONFIG } = require('./config');

// config stuff
const PORT = process.env.PORT || 8080;

const knex = require('knex')(KNEX_CONFIG);
const app = express();
app.use( bodyParser.json() );
app.use((req, res, next)=>{
    console.log(`origin is : ${req.headers.origin}`);
    if (req.headers.origin){

        res.setHeader('Access-Control-Allow-Origin', req.headers.origin );
        res.setHeader('Access-Control-Allow-Credentials' , 'true' );
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type' );
        
    }
    next();                                 
});
/*
space
*/

async function sendUrl(type /*'admin' || 'verify'*/ ){
    // let transporter = nodemailer.createTransport();

    function replaceAll(a,b,c){
        buffer = a.replace(b,c);
        if (a === buffer) return a;
        return replaceAll(buffer, b, c);
    }

    let id = uuidv4(SECRET_KEY) + uuidv4(SECRET_KEY);
    id = replaceAll(id, '-', '');
    let verify_url = `http://127.0.0.1:8080/verify?type=${type};id=${id}`;
    console.log(verify_url);

    //now, save url
    try {
        let users = await knex.insert(
                        {id, type,  time: new Date().getTime() })
                        .into('urls');

    } catch (error) {
        if(true/*check if url already exists*/){
            //try again
            setTimeout(() => {
                sendUrl(type);
            }, 1000);
        }
    }
    
}


app.post('/subscribe', async (req, res)=>{
    console.log("Registering user...");
    console.log(req.body);

    let {email, firstname, lastname } = req.body;

    try {
        // add to 'users' db, with 'verified' as false
        let status = await knex.insert( {email, firstname, lastname })
                            .into('subscribers');
        // console.log(status);
        
        console.log("User created successfully!");
        res.status(201).json({status : 201, content : "User created successfully." } );
        // sendUrl('verify');
    } catch (error) {
        console.log('Error insertng user : ' + error);
        res.status(401).json({status : 401, error});
    }

    // res.status(201).json(verify_url);//depends on success or failure
});



app.get('/verify', async (req, res)=>{
    let {id, type} = req.query;
    console.log(`ID is : ${id}`);
    // compare id with database, if it matches: do, else don't.

    let users = await knex.select().from('urls').where('id', id);

    if (users.length === 1){
        // check type and change relevant field(verified, admin) in 'subscribers'
        let { type : link_type } = users[0]; 
        let resolve = await knex('subscribers').update({verified:true});

        // set 'verified' to true --if it isn't, else, handle well 
    }else if (users.length === 0){
        // expired (probably)
    }else{
        // handle edge case here 
    }
    // check 
    
    res.status(201).json(`ID is : ${id}`);

});

async function deleteExpired( lifespan /*milliseconds*/) {

    let epoch_time = new Date().getTime() - lifespan ;
    await knex.delete().from('urls').where('time','<', epoch_time );
}


app.use(express.static('build'));

app.listen(PORT, async ()=>{
    // await knex.insert({id:uuidv4(), type:1234787, time: new Date().getTime() }).into('urls');
    // let users = await knex.select().from('urls');
    // console.log(users);

    // await knex.delete().from('urls').where('time','>', new Date) ;
    // await deleteExpired(60*1*1000);
    // await knex('urls').where('id','2').update({type:'verified'}) ;
    console.log(`I am Server, listening on port ${PORT}!`);
} );