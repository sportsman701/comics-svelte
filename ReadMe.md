# Comics

## Getting Started

This project uses Yarn Workspaces. Each of `server` and `client` define their own `package.json`, but dependencies are shared between the two.

Install and start all dev servers:

```sh
$ yarn install
$ yarn dev:all
```

Run Cypress tests against dev servers in headless mode:

```sh
$ yarn test
```

## Server

The server is an Express/GraphQL app. After install verify everything is good with a test run

## Client

The client is a Svelte app.

## GraphQL Schema

Schemas and queries located in `./schemas`. Files are prefixed with their purpose.

To update services after changing the schema just run `yarn generate` in the root workspace. Schemas are published to:

- `server/src/graphql/schema.generated.graphql`: This is the schema that the GraphQL server will be generated from. It is standard GraphQL schema.
- `server/src/types/schemas.generated.ts`: This is all GraphQL types converted to TypeScript types for import.
- `client/src/graphql/schemas.generated.ts`: This is both type and query definitions of the GraphQL schema. Separating them would be great, but the generator isn't very good at doing imports, so a single file is much easier to manage.

# TODO

- [ ] List count queries `totalCount` should reflect the current filters
- [ ] `num_issues` property for `Title`
- [ ] `num_titles` property for `Publisher`
- [ ] Just why do we need `rollup/plugin-replace` in the client? It feels like a half-assed replacement for good environment management.
- [ ] 404 error handling to avoid cryptic missing field messages
