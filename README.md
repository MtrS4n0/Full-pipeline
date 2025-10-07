# Full-pipeline

## Final task of full IoT pipeline

### This pipeline sends data from DHT22 sensor to Thingspeak,<br />
### where it is collected to node server local host.<br />
### Dashboard is index.html and draws a linechart<br />
### of the data.<br />
### Everytime temperature exceeds 30 °C or is below -10 °C<br />
### a message is sent to a Discord server.<br/>

This project uses an .env file for the API keys -> "npm install dotenv"<br />
Create .env file to root directory. -> See example @ .env.example.<br />
Add .env to gitignore -> "# .gitignore (br) .env"<br />
Create a new folder "public" and add index.html there.<br />
Run node server and index.html<br />

[Server.js](https://github.com/MtrS4n0/Full-pipeline/blob/58a7717cc83bc9ff0e078e4b27ff227e3b854656/server.js)<br/>
[Fetch_temperature.js](https://github.com/MtrS4n0/Full-pipeline/blob/58a7717cc83bc9ff0e078e4b27ff227e3b854656/fetch_temperatures.js)<br/>
[Index.html](https://github.com/MtrS4n0/Full-pipeline/blob/58a7717cc83bc9ff0e078e4b27ff227e3b854656/index.html)<br/>
[Dotenv example](https://github.com/MtrS4n0/Full-pipeline/blob/58a7717cc83bc9ff0e078e4b27ff227e3b854656/.env.example)
