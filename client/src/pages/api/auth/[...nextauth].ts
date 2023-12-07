import NextAuth, { CookiesOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import {signJwtAccessToken} from '../../../lib/jwt';
import { SessionUser } from '@/types/next-auth';
import { JWT } from 'next-auth/jwt';


const cookies ={
  sessionToken:{ 
      name: `next-auth.session-token`,
      options: {
          httpOnly: true,
          sameSite: "none",
          path: "/",
          // domain: process.env.NEXT_PUBLIC_DOMAIN,
          domain: 'http://localhost:3000',
          secure: true,
      },
  },
  callbackUrl: {
      name: `next-auth.callback-url`,
      // options: {
      //     ...
      // },
  },
  csrfToken: {
      name: "next-auth.csrf-token",
      // options: {
      // ...
      // },  
    },
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'},
      },
      async authorize(credentials, req) {
        const {email, password} = credentials;
        // const user = {email: 'test@test.com', password: '123456'};

        const urlencoded = new URLSearchParams();
        urlencoded.append('email', email);
        urlencoded.append('password', password);

        const requestOptions = {
          method: 'POST',
          body: urlencoded,
        };

        const response = await fetch(
          'http://localhost:5008/api/users/login',
          requestOptions
        );

        if (response.ok){
        const data = await response.json();
        console.log('data from nextAuth :>> ', data);
        if (data.token){

          // return data;
          return { ...data, email: credentials!.email, name:data.user._id , user: data.user }
        }
        }
        return null;
      },
    }),
    // GoogleProvider({
    //   id: 'google',
    //   name: 'google',
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    GithubProvider({
      id: 'github',
      name: 'github',
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: { 
    async jwt({token, user}: { token: JWT; user:SessionUser }) {
      console.log('user in JWT:>> ', user);
      console.log('token in JWT :>> ', token);

      return {...token, user};
    },

    async session({session, user, token}:{session:Session, user:SessionUser, token:JWT}) {
      console.log('How does my session callback param look :>> ', session);
;console.log('user :>> ', user);
      
      // session.user.id = token.user._id;
      session!.user = token.user;

  session.token = token;
      console.log('How does my session callback param look after :>> ', session);


  return session;
    },

    cookies: cookies,
  },
};

const handler = NextAuth(authOptions);

export default handler;