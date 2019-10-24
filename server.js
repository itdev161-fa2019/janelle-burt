import express from 'express';
import connectDatabase from './config/db';

const app = express();

connectDatabase();
app.use(express.json({extended:false}));
/*
@route 
@desc 
*/

app.get('/', (req, res) =>
res.send('http get request sent to root api endpoint')
);
/*
@route 
@desc
*/
app.post('/api/users', (req,res) => {
    console.log(req.body);
    res.send(req.body);
});

app.listen(3000, () => console.log(`Express server running on Port 3000`));