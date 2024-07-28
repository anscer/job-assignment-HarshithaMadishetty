import express from 'express';
import passport from 'passport';
import User from '../models/User';

const router =express.Router();

router.post('/register', async(req,res) => {
    const{ username , password }=req.body;
    try{
        const user= new User({username,password});
        await user.save();
        res.status(201).send('User registered')
    }
    catch(error){
        console.error('Error registering user:', error);
        const errorMessage = (error as Error).message;
        res.status(400).send({ error: errorMessage });  
    }
});

router.post('/login', passport.authenticate('local'),(req,res) => {
    res.send('User logged in');
});

export default router;