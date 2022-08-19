const { ADMIN_KEY } = require('../config');


module.exports.loginHandler = async (req, res)=>{
    //
    const {key} = req.body;
    if (key === ADMIN_KEY){
        //generate sessionid, update in sessions db, and send it in 201 resp
        try {
            //
            let session_id = await req.sessionController.setSession();

            res.status(201).json({status : 201, content : "Admin login successful", sid: session_id } );

        } catch (error) {
            //
            console.log(error);
            res.status(401).json({status : 401, content : "Admin login failed : inernal error" } );
        }
    }else{
        //
        res.status(401).json({status : 401, content : "Admin login failed" } );
    }
}

module.exports.logoutHandler = async (req, res)=>{
    //
    let sid = req.body.sid;

    try {
        //
        await req.sessionController.deleteSession(sid);

        res.status(201).json({status : 201, content : "Admin LOGOUT successful"} );

    } catch (error) {
        //
        res.status(401).json({status : 401, content : "Admin LOGOUT : inernal error" } );
    }
} 

module.exports.postHandler = async (req, res)=>{
    //
    const {title, message, author, date} = req.body ;
    let knex = req.knex_object;

    try {
        // 
        let result = await knex.insert({title, message, author, date})
                                .into('feeds');
        console.log(result);

        res.status(201).json({status : 201, content : "feed added successfully" } );
        
    } catch (error) {
        console.log('Error fetching data : ' + error);
        res.status(401).json({status : 401, error});
    }
                        
}

module.exports.deleteHandler = async (req, res)=>{
    //
    const index_value = req.params.index ;
    let knex = req.knex_object;

    console.log(`Deleting entry with 'index' = ${index_value}..`);

    try {
        // 
        let result = await knex.delete()
                            .from('feeds')
                            .where({ index : index_value} ) ;

        console.log(result);

        res.status(201).json({status : 201, content : result } );
        //
    } catch (error) {
        console.log('Error deleting data : ' + error);
        res.status(401).json({status : 401, error});
    }
}