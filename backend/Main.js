const express       = require('express');
const app           = express();
const path          =require('path');
const mysql         = require('mysql');
const session       = require('express-session');
const MySqlStore    = require('express-mysql-session')(session);
const Router        = require('./Router');
const cors = require('cors');

app.use(cors({ 
    origin: 'http://localhost:3001', // Allow frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // Allow cookies
}));


app.use(express.static(path.join(__dirname,'build')));
app.use(express.json());



const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'myapp'
})

db.connect(function(err){
    if(err){
        console.log('DB error');
        throw err;
        return false; 
    }
})

const sessionStore = new MySqlStore({
    expiration:(1825 * 86400 *1000),
    endConnectionOnClose: false
},db);

app.use(session({
    key:'4289thgub4390ghejgbsdifhsd',
    secret:'mg3g48hddnxnjnALKFJjdhfadfj',
    store:sessionStore,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:(1825*86400*1000),
        httpOnly:false
    }
}
)); 

new Router(app,db);
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'build',index.html));
})
app.listen(3000);