const express = require('express');
const router = express.Router();


const {subscribe, getFeeds} = require('../handlers/public');
const {loginHandler, logoutHandler, postHandler, deleteHandler} = require('../handlers/admin');


function auth(req, res, next) {
    let sid = req.body.sid;

    let check = req.sessionController.sessions_list.find( x => x.id === sid );
    if ( check){
        next();
    }else{
        res.status(401).json({status : 401, content : "Failed: Authentication error" } );
    }
}


router.post('/subscribe', subscribe );

router.post('/login', loginHandler );

router.post('/logout', logoutHandler );

router.get('/feeds', getFeeds );


router.post('/post', auth, postHandler );

router.delete('/delete/:index', auth, deleteHandler ); 


module.exports = router;
//     function replaceAll(a,b,c){
//         buffer = a.replace(b,c);
//         if (a === buffer) return a;
//         return replaceAll(buffer, b, c);
//     }