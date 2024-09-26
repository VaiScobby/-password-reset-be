# GUVI - DAY 40

## Password reset TASK.

### How to run the project on your machine:

1. clone the repository to your local machine.

```
git clone
```

2. To install all the dependencies:

```
npm i express
npm i nodemon --save-dev
npm i bcrypt
npm i cors
npm i dotenv
npm i mongoose
npm i nodemailer
```

3. Once everything is installed successfully, now it's time to run the server.

```
npm run dev
```

### Dependencies used

1. express

```
npm i express
```

2. nodemon

```
npm i nodemon --save-dev
```

3. bcrypt

```
npm i bcrypt
```

4. cors

```
npm i cors
```

5. dotenv

```
npm i dotenv
```

6. mongoose

```
npm i mongoose
```

7. nodemailer

```
npm i nodemailer
```

### Setup.

1. Run the following command to create a new project.

```
    npm init -y
    npm i express
    npm i nodemon --save-dev
    npm i bcrypt
    npm i cors
    npm i dotenv
    npm i mongoose
    npm i nodemailer
```

2. We create a javascript file named `index.js` which is the root of the project.

3. We change the `package.json` file to include start and dev parameter to make the script run from the command `npm run dev`.

# API endpoints

## 1) create user

POST Method
endpoint:/users

## 2) send a Password reset mail for given email

PUT Method
endpoint:/users/forgot

## 3) A verify the given string

GET Method
endpoint: /users/verify/:key

## 4) Password reset

PUT Method
endpoint: users/reset

# Deployed URL

# POSTMAN DOCUMENT URL

https://documenter.getpostman.com/view/34880027/2sA3duGt9V
