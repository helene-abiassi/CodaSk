import NextAuth from "next-auth/next";

declare module "next-auth"{
//   Returned by `useSession`, `getSession` and received asa prop on the `SessionProvider` React Context
    interface Session{
        refreshTokenExpires?: number;
        accessTokenExpires?: string;
        refreshToken?: string;
        token?: string;
        error?: string;
        user?: SessionUser
    }
}

interface SessionUser {
    _id?: string,
    name?:string,
    email?: string,
    password?: string | null,
    // accessToken?:string
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
      refreshTokenExpires?: number;
      accessTokenExpires?: number;
      refreshToken?: string;
      token: string;
      exp?: number;
      iat?: number;
      jti?: string;
    }
  }