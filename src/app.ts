import express from 'express';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth';
import stateRoutes from './routes/state';

const app=express();

//Middleware
app.use(bodyParser.json());
app.use(session({secret:'secret',resave:false,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/auth',authRoutes);
app.use('/states',stateRoutes);

export default app;