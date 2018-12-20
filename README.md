# Notes
This is a web application for keeping track of your notes. When you first visit the [website](https://notes-application-1.herokuapp.com) it redirects you to Google consent screen for authentication with Google OAuth 2.0. After successfull authentication you will be redirected to the main page where you can create, update, delete and view your notes. All notes that you have created are only associated with your current authenticated Google account in MongoDB. You can also logout anytime you want. The back-end will keep your session valid for 2 weeks.

## Front-End
* [React](https://reactjs.org/)
* [Less](http://lesscss.org/)

## Back-End
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Passport](http://passportjs.org)
* [MongoDB](https://www.mongodb.com/)

## Installation guide
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You need to obtain Google OAuth 2.0 credentials before you can continue.

### Installing
A step by step guide to get development environment running.
1. Clone this repository.
```
git clone https://github.com/NikoNordstrom/Notes.git
```
2. Navigate to the cloned repository.
```
cd Notes
```
3. Install dependencies.
```
npm install
```
4. Create `.env` file to the root of the project folder. The `.env` file should look something like this:
```
CLIENT_ID=<your google oauth 2.0 client id>
CLIENT_SECRET=<your google oauth 2.0 client secret>
SESSION_SECRET=<insert some secure string here>
CALLBACK_URL=http://localhost:8080/auth/google/callback
DATABASE_URL=mongodb://localhost/notes
PORT=8080
```
5. Run the app.
```
npm start
```