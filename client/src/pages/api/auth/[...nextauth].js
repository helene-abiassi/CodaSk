import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
// import User from "../../../types/custom_types"
import {signJwtAccessToken} from '../../lib/jwt';

export const authOptions = {
  providers: [
    GithubProvider({
      id: 'github',
      name: 'github',
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'},
      },
      async authorize(credentials, req) {
        //Faking user
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
        const user = await response.json();
        console.log('data :>> ', data);

        // If no error and we have user data, return it
        if (response.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // GoogleProvider({
    //   id: 'google',
    //   name: 'google',
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  // pages: {
  //   signIn: '/auth/login',
  // }, //?
  //   signOut: '/auth/signout',
  //
  callbacks: {
    async jwt({token, user}) {
      console.log('user :>> ', user);
      if (user?.email) {
        return {...token, ...user};
      }
      // if (token?.accessTokenExpires) {
      //   if (Date.now() / 1000 < token?.accessTokenExpires)
      //     return {...token, ...user};
      // } else if (token?.refreshToken) return refreshAccessToken(token);

      // return {...token, ...user};
    },

    async session(session, token, user) {
      session.data.user.id = user.id;
      session.data.user = token;

      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          id: user.id,
          email: user.email,
          password: user.password,
        },
      };
    },

    // jwt,
  },
};

const handler = NextAuth(authOptions);

export default handler;
