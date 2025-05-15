// import NextAuth from 'next-auth';
// import SequelizeAdapter from '@auth/sequelize-adapter';
// import sequelize from '@/app/data/connection';
// import Google from 'next-auth/providers/google';

// const handler = NextAuth({
//   adapter: SequelizeAdapter(sequelize),
//   providers: [
//     Google({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       }),
//   ],
//   session: {
//     strategy: 'database',
//   },
//   // Optional callbacks or events here
// });

// export { handler as GET, handler as POST };


// import NextAuth from 'next-auth';
// import SequelizeAdapter from '@auth/sequelize-adapter';
// import sequelize from '@/app/data/connection';
// import Google from 'next-auth/providers/google';

// const handler = NextAuth({
//   adapter: SequelizeAdapter(sequelize),
//   providers: [
//     Google({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       }),
//   ],
//   session: {
//     strategy: 'database',
//   },
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       console.log('signIn callback', { user, account, profile });
//       return true; // Ensure user can sign in
//     },
//     async session({ session, user }) {
//       console.log('session callback', { session, user });
//       return session;
//     },
//   },
//   // Optional callbacks or events here
// });

// export { handler as GET, handler as POST };

