import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import { Pool } from "@neondatabase/serverless";

// const pool = new Pool({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
    return {
      providers: [Google],
      callbacks: {
        async signIn({ profile }) {
          try {
            const baseUrl = process.env.BASEURL
              ? "https://" + process.env.BASEURL
              : "http://localhost:3000";
            console.log(baseUrl)
            fetch(`${baseUrl}/api/user/create`, {
              body: JSON.stringify(profile),
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
            return true;
          } catch (error) {
            console.error("Error creating user:", error);
            return false;
          }
        },
      },
    };
  });
