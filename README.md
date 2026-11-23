<img src="https://res.cloudinary.com/dfm1r4ikr/image/upload/c_thumb,w_200,g_face/v1704299854/codask/website_photos/CodaskLogo_x0s43q.png" alt="Codask logo" />

# Codask

Codask is an educational platform and student community for web development
and data analytics students, graduates, and mentors from Code Academy Berlin.
It began as a collaborative final web development bootcamp project by Rafał
Zajac, Helene Abi Assi, and Thair Orfali.

## Features and project status

Codask brings together questions and profiles for the Code Academy community.
The application includes pages for browsing and sorting questions, asking
questions, and viewing user profiles. Its API provides authentication and
user, question, answer, and tag endpoints.

Some parts of the application are still being developed or reconstructed:

- Polls, student projects, and discussions are currently placeholder pages.
- Module search is in development, and the tag search page is being
  reconstructed.
- The Connect page does not currently display a user directory.

## Getting started

The project has two applications:

- [Client README](./client/README.md): React app setup, configuration, commands,
  and deployment.
- [Server README](./server/README.md): API and MongoDB setup, environment
  variables, testing, and deployment.

For local development, install Node.js and npm and follow the server and client
setup instructions above. Docker Compose can start both applications and a
persistent local MongoDB database. A new database is empty; optional sample data
is described in the server README. Server integration tests run on the host
using Testcontainers and require a running Docker daemon. See the app READMEs
for prerequisites, environment configuration, and Docker details.

## Technologies

- React, TypeScript, Vite, and Tailwind CSS
- React Hook Form, Zod, and Quill
- NestJS, MongoDB, and Mongoose
- Swagger UI

## Links

- [Deployed application](https://codask.org)
- [API documentation](https://api.codask.org/docs)
- [Figma design](https://www.figma.com/file/EvR6lR70uN6tXBimvGPnVR/Codask---Public?type=design&node-id=0%3A1&mode=design&t=XVwnIUeF8d4KDOMm-1)
