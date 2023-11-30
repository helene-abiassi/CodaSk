// Mock user data for demonstration
const users = [
  {
    id: 1,
    username: 'jsmith',
    password: 'password123',
    email: 'jsmith@example.com',
  },
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        username: {label: 'Username', type: 'text', placeholder: 'jsmith'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        const user = users.find(
          (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
        );

        if (user) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      id: 'google',
      name: 'Google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      id: 'github',
      name: 'Github',
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Add more providers here
  ],
  callbacks: {
    async session(session, user) {
      return Promise.resolve({
        ...session,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    },
  },
};

export default NextAuth(authOptions);
