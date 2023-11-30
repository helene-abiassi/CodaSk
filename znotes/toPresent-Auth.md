NextAuth Setup :

- Installed as a dependendy npm i next-auth at the root project folder
- The below applies only to Page router

- With NextAuth.js, the traditional signup and login endpoints you previously handled will be replaced by NextAuth.js's built-in authentication flow
- Set up authentification with Credentials (username, email, password) - OAuth ++ (Github, Google) - preferred -
- Has built-in support for MongoDB db- add dependency MongoDbAdapter and configure it in server
- Add your environmental variables before starting to configure (https://next-auth.js.org/configuration/options) (double check for secret)

1 - - Create a config folder /api/auth with the global configuration file [...nextauth].js. This is the dynamic route handler that will handle all the requests from email providers that we include in our function.
With this dynamic route, all requests in our client done to ['/api/auth/*'] (signIn, signOut, etc.) will automatically be handled by our NextAuth.js. config file

2- - Add all the providers from which you want to add authentification (i.e, Google, GitHub, Credentials).
!! To create an auth function with multiple providers, you need to specify a unique id for each one ++ The order we arrange them in the function need to match the way we display them on the registration page

- - - - Credentials provider --
        Allow signin with arbitrary credentials
        Set up the Credentials object and add the necessary fields (id, name, type)
        Creates an object where we can add the fields of our user we want to capture - And we will need to replicate this in our signIn form
        //RAULNOTE - is this for register or login? or is this a stupid question?
        Credentials provider can only be used if JSON Web Tokens are enabled for sessions
        //RAULNOTE - how to make sure of that?
        - - Add our logic to the authorize method in the CredentialsProvider
- - - - OAuth provider- Google --
        Configuration and more documentation to read (yey!)(https://next-auth.js.org/providers/google)(https://developers.google.com/identity/protocols/oauth2)
        Set up env variables for both after the configuration has been done in the Google API Console
        !! Google only provides Refresh Token to an application the first time a user signs in, but this can be overriden
        Google helps with user email verification

      <pre>
      <code>
              const options = {
        ...
        authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
        callbacks: {
          async signIn({ account, profile }) {
            if (account.provider === "google") {
              return profile.email_verified && profile.email.endsWith("@example.com")
            }
            return true // Do different verification for other providers that don't have `email_verified`
          },
        }
        ...
      }
      </code> </pre>

- - - - OAuth provider-Github --
        Putting this on hold for now, and keeping it for later.
        But if we move ahead with Google Auth, this should go pretty quickly

3- - Configuring shared session

- - - Wrap your session context provider at the top of your application.

          When creating our authentification logic, we will be configuring details and logic related to auth providers, callbacks, and session handling.

          We will need to define session in our authContext to pass it to our SessionProvider, and wrap our app with it
          ===> Instances of useSession will then have access to the session data and status (for CSR).

          CLIENT SIDE RENDER:
          To check if a user is active on a client render page, we can use useSession as a React Hook, which is used in nextAuth to check is someone is signed in. Can be used from anywhere in your application.

          useSession() returns an object containing two values: data and status:
          {data: This can be three values: Session / undefined / null.

      status: enum mapping to three possible session states: "loading" | "authenticated" | "unauthenticated"}

       <code>
       import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
const { data: session } = useSession()
if (session) {
return (
<>
Signed in as {session.user.email} <br />
<button onClick={() => signOut()}>Sign out</button>
</>
)
}
return (
<>
Not signed in <br />
<button onClick={() => signIn()}>Sign in</button>
</>
)
}
</code>

After authentication, you need to ensure that the session object is available to the pages you will want to protect. This is often done by retrieving the session within the getServerSideProps, getStaticProps, or API routes and passing it as a prop to your pages.

NextAuth.js provides a getSession() helper which should be called client side only to return the current active session.

          <code>

function SomePage({ session }) {
// Use the session object in your page
// ...

return (

<div>
{/_ Your page content _/}
</div>
);
}

export async function getServerSideProps(context) {
const session = await getSession(context);

if (!session) {
// Redirect or handle unauthenticated access
return {
redirect: {
destination: "/login",
permanent: false,
},
};
}

return {
props: {
session,
},
};
}
</code>

- - - What does a session object look like?
      {
      user: {
      name: string
      email: string
      image: string
      },
      expires: Date // This is the expiry of the session, not any of the tokens within the session
      }

---

4- - Initialization

- - - Setting up API routes
- - - Determining the logic for sessions https://next-auth.js.org/configuration/options#session

- - - Look at SignIn / SignOut in documentation
      //RAULNOTE - Signup and login?
      //RAULNOTE - How to use Rest API endpoints with our methods? https://next-auth.js.org/getting-started/rest-api
      Set options
      https://next-auth.js.org/configuration/options#pages
      Set your provider logic
      https://next-auth.js.org/configuration/options#callbacks

<code>
session: {
   <!-- Choose how you want to save the user session.
   The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
   If you use an `adapter` however, we default it to `"database"` instead.
   You can still force a JWT session by explicitly defining `"jwt"`.
   When using `"database"`, the session cookie will only contain a `sessionToken` value,
   which is used to look up the session in the database.
  strategy: "database", -->
//RAULNOTE - Do I use database here?? Or revert to jwt token generation?
<!-- Seconds - How long until an idle session expires and is no longer valid.          -->

maxAge: 30 _ 24 _ 60 \* 60, // 30 days

 <!-- Seconds - Throttle how frequently to write to database to extend a session.
 Use it to limit write operations. Set to 0 to always update the database.
 Note: This option is ignored if using JSON Web Tokens -->

updateAge: 24 _ 60 _ 60, // 24 hours

 <!-- The session token is usually either a random UUID or string, however if you
 need a more customized session token string, you can define your own generate function. -->

generateSessionToken: () => {
return randomUUID?.() ?? randomBytes(32).toString("hex")
}
}
</code>
b

- - - - - - TUTORIALS
            Securing pages and api routes https://next-auth.js.org/tutorials/securing-pages-and-api-routes
            Adding role-based login https://authjs.dev/guides/basics/role-based-access-control
            Writing tests with CYpress https://next-auth.js.org/tutorials/testing-with-cypress
