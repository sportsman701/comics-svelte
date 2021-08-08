# Comics

## Getting Started

This project uses Yarn Workspaces. Each of `server` and `client` define their own `package.json`, but dependencies are shared between the two. The `concurrently` package is installed to the workspace to enable servers to be started in one command.

```sh
$ yarn install
$ yarn dev:all
```

## Server

The server is an Express/GraphQL app. After install verify everything is good with a test run

## Client

The client is a Svelte app.

## Updating GraphQL Schema

@TODO: move this up to the workspace if we need it in the front-end, preferably in to a sharable package

```sh
$ cd server
$ yarn generate
```
