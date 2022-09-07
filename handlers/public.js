const sendMail = require('../mail/sendMail');

module.exports.subscribe = async (req, res)=>{
    console.log("Registering user...");
    console.log(req.body);

    let {email, firstname, lastname } = req.body;
    let knex = req.knex_object;

    try {
        // add to 'subscribers' db 
        let status = await knex.insert( {email, firstname, lastname })
                            .into('subscribers');
        // console.log(status);
        
        console.log("User created successfully!");
        res.status(201).json({status : 201, content : "User created successfully." } );

        //send welcome email
        sendMail(
            email,
            "Welcome to CBYM!",//title 
            "INSERT WELCOME TEXT HERE"// text
        );
    } catch (error) {
        console.log('Error insertng user : ' + error);
        res.status(401).json({status : 401, error});
    }

}

module.exports.getFeeds = async (req, res)=>{
    let {start, number} = req.query ;
    console.log(req.query);
    let knex = req.knex_object;

    try {
        // 
        let result = await  knex.select().from('feeds')
                            .where('index','>', start )
                            .limit( number ) ;
        console.log(result.length + " feed results");

        res.status(201).json({status : 201, content : result } );
        //
    } catch (error) {
        console.log('Error fetching data : ' + error);
        res.status(401).json({status : 401, error});
    }
                        
}