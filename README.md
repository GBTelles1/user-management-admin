## Description

This is a basic User Management System project made for the tech test of InterNations.

### Technologies

- Next: provides me performance, caching, and easy configuration.
- Typescript: provides me productivity, and trustability.
- Styled-components: provides me the power of Typescript in CSS without losing the CSS syntax and in a Clean Code way.
- Zod: has a good integration with next and typescript.
- ESLint: provides me a good balance between clean code and productivity, also giving trustability.
- Json-server: just to simulate a backend and make it more realistic.

## Getting Started

First, install the dependencies:

```bash
npm i
```

In this project, we use json-server. So to install it:

```bash
npm install -g json-server
```

Then, create a db.json file with some data (I've leave a example in the repository, but feel free to change it).

Now, run the server
```bash
json-server --watch db.json --port 3004
```
Don't forget to run it in the port 3004 by using the "--port 3004" flag, because our frontend is using the port 3000.

Then run the development frontend:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- [x] I can see a list of existing users
- [x] I can see a list of existing groups
- [x] I can create users
- [x] I can create groups
- [x] I can assign users to a group they aren’t already part of
- [x] I can remove users from a group
- [x] I can delete groups when they no longer have members
- [x] I can delete users
- [x] A "user detail page" where it is possible to see a list of all groups that a given user is in
- [x] A "group detail page" where it is possible to see a list of all users in a given group
- [] Search functionality
- [x] When a user is deleted, they are removed from all groups they belonged to
- [x] A user cannot be created without having at least one group (think validation when creating a user)
- [x] Input validation on the client-side
- [x] Responsive
- [] JS tests
- [x] ES6 syntax
- [x] ESLint (with some custom rules)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
