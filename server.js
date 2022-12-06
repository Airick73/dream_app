//as server side code is handled in this file

//importing from .env file gives access environment variables
import * as dotenv from 'dotenv';
// .config() loads .env content into process.env
dotenv.config();

//importing OpenAI so we can initialize open AI sdk, 
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI, //from .env file
});

//initialize openAI sdk
const openai = new OpenAIApi(configuration);

//importing express and middleware(cors)
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
//only handle data in json format
app.use(express.json()); 

//first arg is a string representing endpoint
//second arg is a callback function that is called ever
//time someone navigates to this url
//*****http://localhost:8080/dream*******
app.post('/dream', async(req, res) => {
    
    const prompt = req.body.prompt; //prompt or descr. of image

    //await will pause execution of call untill openAI responds
    const aiResponse = await openai.createImage({
        prompt, //descrip. of image
        n: 1, //# of image to gen
        size: '1024x1024', 
    });
    
    //aiResponse.data.data[0].url gives the image url
    const image  = aiResponse.data.data[0].url; 
    //send url back to client as response by invoking the send method
    //and passing image varaible as arg, they recieve  json
    res.send({ image });
});

//fire up the server by calling app listen followed by port 
//second arg is a callback that is called when server is started
app.listen(8080, () => console.log('Make art on http://localhost:8080/dream'));