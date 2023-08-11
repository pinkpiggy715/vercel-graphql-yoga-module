# Setup local environment

Copy `sample.env` and rename it to `.env`. Ask a dev for the values.

## Development

```bash
$ npm install
$ npm run dev
$ open http://localhost:3001/api/graphql # opens graphql server
```

## Codegen

```bash
npm run codegen
```

<br /><br />

# Knowns issue

- GraphQL types issue
  - If you see a GraphQL error in resolver regarding `root, args, context` types. Open the `src/routes/graphql/types/graphql.ts` file and it should auto-resolve!

<br /><br />

# GraphQL

## Query/Mutation

```mermaid
 sequenceDiagram
    autonumber
    participant Client
    participant Middleware
    participant Server
    participant graphqlshield as Graphql-Shield
    participant yup as Yup
    participant Resolver
    participant Provider
    participant DataLoader
    participant Backend

    note over Client: Initiates the request (Query/Mutation)
    Client->>Middleware: /graphql
    note over Middleware: does the user have access to API
    Middleware->>Server: req
    Server->>graphqlshield: Check Resource Access
    note over graphqlshield: Uses graphql-shield for resource-specific AuthZ
    graphqlshield-->>Server: Authorization Result
    Server->>yup: Validate Input
    note over yup: Uses yup for input validation
    yup-->>Server: Validation Result
    Server->>Resolver: Resolve Request
    note over Resolver: Translates request for provider
    Resolver->>Provider: Handle Request
    note over Provider: Applies business logic
    Provider->>DataLoader: Load/Update Data
    note over DataLoader: Batches & caches data requests/modifications
    DataLoader->>Backend: Execute Request in DB
    note over Backend: Stores/returns data (queries) or confirms modification (mutations)
    Backend-->>DataLoader: Return Data/Confirmation
    DataLoader-->>Provider: Return Data/Confirmation
    Provider-->>Resolver: Return Data/Confirmation
    Resolver-->>Server: Resolve Response
    Server-->>Client: Return Response


```
