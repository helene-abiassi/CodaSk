# Server

Server application contains both REST and GraphQL APIs which serve connection with a Mongo database, store images in Cloudinary and provide user authentication with JWT tokens. To make it run properly please follow the instructions below.

### Project requirements:

Begin with installing all project dependencies:
`npm i`

To use all functionalities you'll need to set up a MongoDB database and cloudinary account. Then add corresponding credentials to your **.env** file in the main project directory. It should look like this:

```MONGO DB
Name of the app might also differ depending on your setup
DB=mongodb+srv://<username>:<password>@totartapp.6svr47p.mongodb.net/TotArt?retryWrites=true&w=majority

Cloudinary
CLOUDINARY_CLOUDNAME=<your credentials>
CLOUDINARY_APIKEY=<your credentials>
CLOUDINARY_APISECRET=<your credentials>
CLOUDINARY_URL=<your credentials>

SECRET_KEY=<any key provided by you>
```

And that should be all! To run the app use command:

`npm run start`
