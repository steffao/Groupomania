# GROUPOMANIA #

## Presentation ##

Groupomania is a the last project of OpenClassrooms Web developement training. This project involves creating a corporate Social Media for Groupomania company.

## Specification ##
- Create or delete an account as creator or moderator role
- Create and share a post with or without multimedia content attached
- Comment a post and delete a comment as creator or moderator

## Usage ##
To develop this app, I used the following languages :

### Frontent ###
- Vue JS 3

### Backend ###
- Node JS
- SQL Database and Sequelize

## Installation ##

Clone this repo, run `npm install`, from both backend and frontend/groupomania-app repository.

Create your SQL database

Create a .env file  into the `backend` repository and update the variables according to .env.example file

Create a repository `medias` into the backend repository


## Launch ##

### Backend ###
Run `npx sequelize db:migrate` to import the database models and settings

Run `node server` from `backend` repository.

### Frontent ###
Run `npm run serve` from frontend/groupomania-app repository.

This should both run the local server and launch your browser.

If your browser fails to launch, or shows a 404 error, navigate your browser to http://localhost:8080.

The app should reload automatically when you make a change to a file.

Use `Ctrl+C` in the terminal to stop the local server.
