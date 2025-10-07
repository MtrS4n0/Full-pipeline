import express from 'express';
import fetchTemperatureAndNotify from './fetch_temperature.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

const webhook = process.env.DISCORD_WEBHOOK_URL;
const app = express();
app.use(express.json());
const PORT = 3000;
app.use(cors());

app.get('/api/temperatures', async (req, res) => {
  const channelId = process.env.THINGSPEAK_CHANNEL_ID;
  const apiKey = process.env.THINGSPEAK_API_KEY;
  const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching ThingSpeak data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.use(express.static('public'));

setInterval(async () => {
    try {
        await fetchTemperatureAndNotify();
    } catch (err) {
        console.error('Error in scheduled temperature check:', err);
    }
}, 10000);

app.post('/notify', (req, res) => {
    const {message} = req.body;

    if(!message){
        return res.status(400).json({error: 'Message is required'});
    }

    fetch(webhook, {
        method: 'POST', 
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({content:message})
    })
    .then(response => {
        if(!response.ok){
            throw new Error(`Discord responded with status ${response.status}`);
        }
        res.json({status: 'Message sent...'})
    })
    .catch(error =>{
        console.error('Error sending to Discord', error);
        res.status(500).json({error: 'Failed sending your message'})
    });
});

app.listen(PORT, () =>{
    console.log(`Server running at localhost: ${PORT}`);
});
