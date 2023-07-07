# Setup

## Local

- Clone the repo
- Install dependencies `yarn`
- Run `cp .env.example .env`
- Fill in the `.env` file with the correct values
- Run `yarn dev` to start the application
- Make sure the application is running on port 3000

## Setup localtunnel

- Install localtunnel `yarn -g localtunnel`
- Run `lt --port 3000` to start the tunnel
- Copy the url generated and paste it in the appscript in the sheet extension where it says `webhookUrl`