import dotenv from 'dotenv';
dotenv.config();

const channelId = process.env.THINGSPEAK_CHANNEL_ID;
const apiKey = process.env.THINGSPEAK_API_KEY;
const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}`;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

async function fetchTemperatureAndNotify() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const feeds = data.feeds;
        const latest = feeds[feeds.length - 1];
        const temp = parseFloat(latest.field1);

    if (!isNaN(temp) && (temp > 30 || temp < -10)) {
      const message = `Alert: Temperature is ${temp}°C at ${latest.created_at}`;
      const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message })
      });
    if (!discordResponse.ok) {
        throw new Error(`Discord responded with status ${discordResponse.status}`);
      }

      console.log('Notification sent to Discord');
    } else {
      console.log(`Temperature is normal: ${temp}°C`);
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export default fetchTemperatureAndNotify;
