const mysql=require('mysql');
require('dotenv').config({ path: './config/.env' });

var connection=mysql.createConnection({
port:process.env.PORT_DB,
host:process.env.HOST_DB,
user:process.env.USER_DB,
password:process.env.PASSWORD_DB,
database:process.env.NAME_DB
});



module.exports=connection;