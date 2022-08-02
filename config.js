const SECRET_KEY = process.env.SECRET_KEY || 'RD1H233B4DW038HXS21CXGXBJX1N1IP4232N2WBX2G3C4DXW4C';
const KNEX_CONFIG = 
(process.env.environment === 'production')?
{}
:
{
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        database: 'cbym',//
        port: 5432,
        user: 'postgres',
        password: 'judgementday'
    }
};

module.exports = {
    SECRET_KEY,
    KNEX_CONFIG
}