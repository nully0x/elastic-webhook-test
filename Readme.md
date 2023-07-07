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
- Copy the url generated and paste it in the appscript in the sheet extension where it says `webhookUrl`