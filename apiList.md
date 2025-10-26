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
- POST /request/send/:status/:toUserId -- status can be ignored or interested
- POST /request/review/:status/:requestId -- status can be rejected or accepted


## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected.