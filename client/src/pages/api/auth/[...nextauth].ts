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
          domain: 'http://localhost:3000',
          secure: true,
      },
  },
  callbackUrl: {
      name: `next-auth.callback-url`,
  },
  csrfToken: {
      name: "next-auth.csrf-token", 
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
        const { email, password} = credentials;

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
        console.log(' data from nextAuth :>> ', data);
        if (data.token){

          console.log('data.user :>> ', data.user);
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
      console.log('token in JWT :>> ', token);
      // token.user = user
      console.log('user in JWT:>> ', user);


      return {...token, user};
    },

    async session({session, user, token}:{session:Session, user:SessionUser, token:JWT}) {
      // console.log('How does my session look :>> ', session);
      
      // session.user.id = token.user._id;
      // session!.user = token.token;
      // session.user = user
      
      // session.token = token;
      // session.user.name =token.id
      console.log('user in SESSION:>> ', user);
      console.log('token in SESSION:>> ', token);


  return session;
    },

    cookies: cookies,
  },
};

const handler = NextAuth(authOptions);

export default handler;