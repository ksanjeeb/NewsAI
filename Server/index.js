import express from 'express';
import newsRoute from './routes/newsRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', newsRoute);

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is successfully running and listening on port ${PORT}`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
