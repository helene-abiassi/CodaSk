import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface Sesstion{
        user:{
            id: string,
            email: string,
            password: string,
            accessToken:string
        }
    }
}