# Look Mart BD Frontend 

### 1. install dependency manager

install dependency manager for your project

```
# if you're used pnpm

pnpm install

or 

npm i 
```

### 2. Change envirenment variables

change your .env or .env.example or create one and put all these keywords with values
```
#current application running url
NEXT_PUBLIC_APP_URL=http://192.168.0.106:3000

# Application Name
NEXT_PUBLIC_APP_NAME="Look Mart BD"

# backend api url without end backslash
NEXT_PUBLIC_API_URL=http://192.168.0.106:8000/api

# login with google credential which collect from https://console.cloud.google.com/
NEXT_PUBLIC_GOOGLE_CLIENT_ID=dsfaw3432eradsetc

# login with google credential which collect from https://developers.facebook.com/
NEXT_PUBLIC_FACEBOOK_CLIENT_ID=""
 
# any hardest string anyone can't guest it as backend uses same key
REVALIDATE_SECRET="3!@4kjdrf()(*34kjf&MD^343NCY43%%DCYkJ"

```

### 3 Run Application 

Run this command to run application on local server

```
# if you're used pnpm

pnpm run dev 

or 

npm run dev

```

### 4 Test Application

Run this following command to test this application 
```
# if you're used pnpm

1. pnpm run build
2. pnpm start

or 

1. npm run build 
2. npm start

```

