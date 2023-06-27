
# Locastic-backend-project
The task consists of creating a RESTful API that allows users to register, login and access a protected resource using JWT token. It must be built using any Node.js framework and database, in this case Express and MongoDB with Mongoose ODM(object document modeling) library.

## API features for each endpoint:
- USERS: 
- registration using "bcrypt" library for hashing the password
- login using "bcrypt" library for password validation and assigning the JWT token
- fetching all/individual user data by authenticated users
- deleting individual users by users with "admin" role permissions
- POSTS:
- creating, updating and deleting posts by authenticated users
- fetching posts by unauthenticated users with filtering only allowed posts
- fetching all posts by authenticated users with "admin" role permissions
- fetching inidividual posts
- POST REQUESTS:
- handling and fetching post requests by authenticated users with "admin" role permissions.

NOTE: the API development is not completed yet by both task specification and planned additional features that mostly concern with handling authorised CRUD operations, which have certain security flaws, and implementing another role("Blogger) for posts creators. Furthermore, the frontend is not made to showcase the usage of API so Postman/Thunder or any such client is required for testing API functions.

## To run the API locally, do the following:
Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Environment variables:
```bash
  MONGO_ATLAS_PW
```
```bash
  JWT_KEY
```

## API authentication:
Some endpoints may require authentication, for example: to handle most CRUD operations on posts, you need to register your API client and obtain an access token upon login. The endpoints that require authentication expect a bearer token sent in the Authorization header.

Example:

Authorization: Bearer YOUR TOKEN
