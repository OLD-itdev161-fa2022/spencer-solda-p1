import express from 'express';
import connectDatabase from './config/db';
import {check, validationResult} from 'express-validator';

// Initialize express application
const app = express();

// Connect database
connectDatabase();

// Configure Middleware
app.use(express.json({ extended: false}));

// API endpoints
/**
 * @route GET /
 * @desc Test endpoint
 */
 app.get('/', (req, res) =>
 res.send('Welcome to project one.')
);

app.get('/dog', (req, res) =>
 res.send('Woof.')
);

app.get('/cat', (req, res) =>
 res.send('Meow.')
);

app.get('/sloth', (req, res) =>
 res.send('<img src="https://files.worldwildlife.org/wwfcmsprod/images/Baby_Sloth_Hanging_iStock_3_12_2014/portrait_overview/4zhzw2pmf0_iStock_000016816803XLarge_mini.jpg">')
);

app.get('/giraffe', (req, res) =>
 res.send(['Northern Giraffe', 'Reticulated Giraffe', 'Masai giraffe'])
);

app.get('/elk', (req, res) =>
res.sendFile('elk.html', {root: __dirname})
);

app.get('/eagle', (req, res) =>
res.download('eagle.pdf')
);

app.get('/fish', (req, res) =>
res.redirect('https://en.wikipedia.org/wiki/Fish')
);

app.get('/dinosaur', (req, res) =>
res.sendStatus(410)
);

app.get('/squirrel', (req, res) =>
res
.cookie('squirrelcookie', 'true')
.send('<img src="https://i.ytimg.com/vi/cfRQ0Z6J4dM/maxresdefault.jpg">')
);

app.get('/squirrel2', (req, res) =>
res
.clearCookie('squirrelcookie')
.send('<img src="https://laughingsquid.com/wp-content/uploads/2014/11/Chipmunk.jpg">')
);

/**
 * @route POST api/users
 * @desc Register user
 */
 app.post(
    '/api/users',
    [
        check('name', 'Please enter your name')
            .not()
            .isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6})
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        } else {
            return res.send(req.body);
        }
    }
);

// Connection listener
app.listen(3000, () => console.log('Express server running on port 3000'));