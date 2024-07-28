import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT =process.env.PORT || 3000;
const MonGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/stateManagementDB';

mongoose.connect(MonGO_URI)
.then(() => {
    console.log('MongoDB connected...');
    app.listen(PORT, () => {
        console.log('Server is running on port ${PORT}');
    });
})

.catch(err => {
    console.error('Failed to connect to MongoDB',err);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
  });