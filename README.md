# This project is now __deprecated__. 

It will not be updated nor worked on in the future.

The project that replaces it is here: [robbestad.com at github](https://github.com/svenanders/robbestad.com)

--------------------
### Procedure

Updated blog platform

Check out [the result](http://robbestad.herokuapp.com/)

## Build

   Clone the repo.
   **npm install**

## Workflow

Do all your work in 'src'. Monitor & build by executing **gulp**. Distribute the 'dist' folder

## Deploy on Heroku

Add the following buildpack (if not previously added):

    heroku config:set BUILDPACK_URL=https://github.com/CHH/heroku-buildpack-php

Deploy the 'dist' folder:

    git subtree push --prefix dist heroku master

Or easier still:

    gulp heroku
