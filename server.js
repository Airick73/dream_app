//importing from .env and setting up config
import * as dotenv from 'dotenv';
dotenv.config();

//importing OpenAI, initializing open AI sdk, 
//and setting up configuration
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);


//importing express and middleware(cors)
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream');