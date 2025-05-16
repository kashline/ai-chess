import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  return {
    providers: [Google],
    callbacks: {
      async signIn({ profile }) {
        try {
          const baseUrl = process.env.BASEURL
            ? "https://" + process.env.BASEURL
            : "http://localhost:3000";
          await fetch(`${baseUrl}/api/user/create`, {
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
