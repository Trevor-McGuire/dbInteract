Application Lifecycle (request-response cycle)

1. User makes a request to the server
    1. data is validated on the client to ensure it is in the correct format and is complete before being sent to the server to reduce the number of requests that are rejected by the server
1. Middleware processes the request
    1. Check for cookie sessionId
    1. validate the sessionId is in the correct format
    1. query the database for the user's session
    1. **if** the session is valid, attach the session to the request object **else** attach a null session to the request object
1. Resolvers are called to fetch data
    1. For auth resolvers, a valid session is required and a null session will result in a `401 Unauthorized` response. For specific auth resolver actions, the session contains the user's id and is used to query the database for the user's data, protecting the user from accessing other user's data.
    2. For non-auth resolvers, the session is not required and the resolver will return data based on the request.
1. Data is returned to the client