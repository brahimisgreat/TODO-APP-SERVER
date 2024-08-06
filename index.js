import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
app.use(cors());

app.use(express.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todo'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM `todos`', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    }); 
});

app.post('/create', (req, res)=> {
    const Names = req.body.Names;
    const sql = `INSERT INTO todos (Names) VALUES (?)`;
    db.query(Names ,sql, (err, result) => {
        if (err) 
            throw err;
        res.send(result);
    });

})



app.listen(7000, () => {
    console.log('Server is running on port 3000');
});