# Dev Tinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logut

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:toUserId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected.