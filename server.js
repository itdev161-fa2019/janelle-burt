import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';
import cors from 'cors';

//initialize express application
const app = express();

//connect database
connectDatabase();

//configure middleware
app.use(express.json({ extended : false}));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

//api endpoints
/**
 *@route GET/
 *@desc test endpoint/
 */
app.get('/', (req, res) =>
    res.send('http get request sent to api endpoint')
);

/**
 *@route POST api/users  
 *@desc register user
 */
app.post(
    '/api/Users',
    [
        check('name', 'Please enter your name')
        .not()
        .isEmpty(),
        check('email', 'PLease enter a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6})
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            return res.send(req.body);
        }
    }
);

//connection listener
const port = 5000;
app.listen(port, () => console.log(`Express server running on port ${port}`));