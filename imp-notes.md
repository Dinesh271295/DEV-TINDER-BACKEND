15-09-2025:

- created a repository
- Initialized the repository
- node_modules, package.json, package-lock.json
- Installed express npm package into the repository
- Created a express server using express() function
- Listen to the incoming requests on port 3000
- written the request handlers for "/test", "/hello", "/" using app.use() function
- Installed nodemon and updated scripts inside package.json. nodemon helps in restarting the server after saving the new changes

16-09-2025:

- difference between package.json and package-lock.json
- play with routes and route extensions
- install postman app and make workspace/collection > test API call
- write a logic to handle GET, POST, PATCH, DELETE, PUT API calls and test them on postman
- explore different routing - use of ?, +, (), * in the routes
- use of regex in routes /a/, /.*fly$/
- reading query params in the routes
- reading the dynamic routes

17-09-2025:

- Multiple route handlers - play with the code
- next();
- next function and errors along with res.send()
- app.use("/route", rH, rh2, [rh3, rh4], rh5)
- what is middleware and why do we need it?
- how express JS basically handles requests behind the scenes
- difference between app.use and app.all
- write a dummy auth middleware for admin
- write a dummy auth middleware for all routes except /user/login
- error handling middleware 


18-09-2025:

- create a free cluster on MongoDB official website. (Mongo Atlas)
- install mongoose library
- connect your application to the database
- call the connectDB function and connect to database before starting application on port 3000.
- create a user schema and user model
- create /signup API to add data to database
- push some documents using API calls from postman
- read about _id and __v created by mongoDB when we add any document

20-09-2025:

- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from the end user
- User.findOne with duplicate email ids, which object returned.
- API - Get user by email
- API - Get all the users from database - GET/feed
- API - Get user by ID
- create a delete user API
- difference between PATCH and PUT http methods
- create a patch user API to update the existing documents
- explore mongoose documentation for Model methods.
- what are options in a Model.findOneAndUpdate method, explore more about it.
- Create an API which updates the user with emailId.

21-09-2025:

- explore schema type options from the documentation
- Add required, unique, lowercase, min, minLength, default, trim
- create a custom validate function for gender
- improve the db schema - put all the appropriate validations on each fiels in schema.
- Add API level validation on Patch request & signup post API
- Add API validations for each fields. -- Data Sanitization
- Install validator
- explore Validator functions

24-09-2025:

- Validate data in SignUp API.
- Install bcrypt package
- Create PasswordHash using bcrypt.hash and save the user with encryted password.
- create login API
- compare passwords and throw errors if email or password is invalid.

01-10-2025:

- Install cookie parser
- send dummy cookie to user
- create GET /profile API and check if you get the cookie back
- Install jsonwebtoken
- In login API, after email and password validation, create a JWT token and send it back to user in cookies
- Read the cookies inside the profile API and find the loggedIn user
- write userAuth middleware
- Add the userAuth middleware in profile API and new sendConnectionRequest API
- set the expiry of JWT token and cookies to 7 days
- create userSchema methods to getJWT.
- create userSchema methods to validatePassword.

12-10-2025:

- Read documentation for express.Router
- create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js

13-10-2025:

- create POST /logout API
- create PATCH /profile/edit
- create PATCH /profile/password API -- forgot password api.
- make sure you validate all data in every POST, PATCH Apis.

25-10-2025:

- create a connectionRequest schema
- send connection request API
- proper validation of Data
- Think about all the corner cases
- $or query and $and query in mongoose
- Read more about logical query
- schema.pre("save") 
- Read more about indexes in MongoDB

26-10-2025:

- create a review connection request API.
- Thought process - POST vs GET
- Read about ref and populate
- create GET API for user/requests/received with all the checks
- create GET API for user/connections







