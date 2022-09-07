const express = require('express');
const router = express.Router();


const {subscribe, getFeeds} = require('../handlers/public');
const {loginHandler, logoutHandler, postHandler, deleteHandler} = require('../handlers/admin');

const {check, validationResult} = require('express-validator');

function auth(req, res, next) {
    let sid = req.body.sid;

    let check = req.sessionController.sessions_list.find( x => x.id === sid );
    if ( check){
        next();
    }else{
        res.status(401).json({status : 401, content : "Failed: Authentication error" } );
    }
}


const subscribe_check = [
    check('email').isEmail().withMessage('Invalid Email').trim()
];

const isValid = (req, res, next)=>{
    const errors = validationResult(req) ;
    console.log('Validating input...');

    if (errors.isEmpty() ){
        console.log('Input verified');
        next();
    }else{
        res.status('401').json({status: 401, content: errors.array() } );
        
        console.log('Validation error!');
        console.log({errors: errors.array() } );
    }
}

router.post('/subscribe', subscribe_check, isValid , subscribe );

router.post('/login', loginHandler );

router.post('/logout', logoutHandler );

router.get('/feeds', getFeeds );


router.post('/post', auth, postHandler );

router.post('/delete/:index', auth, deleteHandler ); 


module.exports = router;
//     function replaceAll(a,b,c){
//         buffer = a.replace(b,c);
//         if (a === buffer) return a;
//         return replaceAll(buffer, b, c);
//     }
// email sender
//     Welcome mail
//     	    parameter is firstname
//     newsmail
// 	        parameter is firstname
//     account 4 limits
// verification
//     frontend
//     backend
// clog verification error
// error to content 