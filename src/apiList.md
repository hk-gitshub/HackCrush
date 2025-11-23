# List for API's for project

# user auth
- POST /signup
- POST /login
- POST /logout

# userPassword
- GET /profile/view
- POST/profile/edit
- POST/profile/password

# userConnectionRequest
- POST /request/send/instrested/:userId
- POST /request/send/ignored/:userId
- POST /request/send/accepted/:reqId
- POST /request/send/rejected/:reqId

# userFeed
- GET /user/connections     
- GET /user/requests        // get all connection request
- GET /user/feed            // get list of all user show on page 