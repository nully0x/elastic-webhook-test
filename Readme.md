# Setup

## Local

- Clone the repo
- Install dependencies `yarn`
- Run `cp .env.example .env`
- Fill in the `.env` file with the correct values
- Run `yarn dev` to start the application
- Make sure the application is running on port 3000

## Setup localtunnel

- In another terminal, install localtunnel `npm install -g localtunnel`
- To expose the application to the internet, run `lt --port 3000`
- Copy the url generated and paste it in the appscript in the sheet extension where it says `webhookUrl` in the appscript eg. `https://abc.localtunnel.me/webhook`
- Remember the url will change every time you run the command, so you will have to update the appscript every time you run the command
- Once setup complete you can run the appscript and it will send the data to the webhook url