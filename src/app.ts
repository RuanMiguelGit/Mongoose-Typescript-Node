import express from 'express'
import passport from 'passport'
import cors from 'cors';
import morgan from 'morgan';
import publicRoute from './routes/publicRoute'
import passportMiddle from './middlewares/passport';
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddle)
app.get('/', (req, res) => {
  return res.send(`The API is at http://localhost:${app.get('port')}`);
})


app.use(publicRoute)

// app.use(specialRoutes);

export default app;