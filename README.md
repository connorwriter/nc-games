# Northcoders House of Games API

# Visit the website

https://nc-games-8it8.onrender.com/

# Summary

This project is a forum of board game reviews. Users are able to comment on reviews, upvote reviews, and delete comments.

# Cloning the repo

1. clone the repo from github to your local desktop
2. open the repo in a code editor
3. install dependencies - in your code editor terminal, run the command "npm install"

# Connecting to the database

After cloning, you must add two new files to the repository:
'.env.development' & 'env.test'

The contents of each file will be:

.env.development: PGDATABASE=nc_games

.env.test: PGDATABASE=nc_games_test

This is to ensure that you can create and access the two databases locally.

# Creating and seeding the database

1. setup db - in your code editor terminal, run the command "npm run setup-dbs"
2. seed database - in your code editor terminal, run the command "npm run seed"

# Tests

To run tests - in your code editor terminal, run the command "npm t

# Requirements

The minimum version of PostgreSQL required to run this app is 14.7
The minimum version of Node.js required to run this app is v18.14.1
