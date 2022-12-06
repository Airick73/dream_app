//importing from .env file
import * as dotenv from 'dotenv';
//loads .env content into process.env
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

app.post('/dream', async(req, res) => {
    
    const prompt = req.body.prompt;

    const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: '1024x1024',
    });

    const image  = aiResponse.data.data[0].url;
    res.send({ image });
});

app.listen(8080, () => console.log('Make art on http://localhost:8080/dream'));