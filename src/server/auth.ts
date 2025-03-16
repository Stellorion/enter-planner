import Credentials from "node_modules/next-auth/providers/credentials";
  
  export const authOptions: any = {
    
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "username" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            console.log(credentials);
            
           const { username, password } = credentials as {
            username: string
            password: string
           };
  
          return null
        }
      })
    ],
  };