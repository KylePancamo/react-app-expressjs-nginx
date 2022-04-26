## WorldWide Frames

This project was designed by Team 2 (Kyle Pancamo, Kamryn Fey, Michael Stepp, Michelle Barrows, Yash Kapoor)
for Software Engineering: CS3773-001 and is indented for educational and learning purposes only. This is our 
first website that we have built together and it simulates an online marketplace that sells a variety of glasses 
from unique manufacturers. This project was quickly designed and built in a period of just under 3 months. We are
very proud of how the site has turned out given that none of us on the team had any web development expericence prior
to this project. 

## Tools/Languages Used
```
Hosting:    Amazon Web Services EC2 instance
Web Server: Nginx
Front-End:  ReactJS
Back-End:   NodeJS
Database:   MySQL
```

## Installation

1. `npm install`
2. Configure `.env` file based on `.env.example`
3. Run `npm start` for local development or `npm run build` for the production build of the app

## Environment

```
REACT_APP_BASENAME=/app
PUBLIC_URL=/app

```

| Parameter                         | Description                                                                                | Required |
| --------------------------------- | ------------------------------------------------------------------------------------------ | -------- |
| REACT_APP_BASENAME                | This is the basename for the React App. It's needed for the Nginx location block           | Yes      |
| PUBLIC_URL                        | This is the basename for the React App. It's needed during build time for the static files | Yes      |