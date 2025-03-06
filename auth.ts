import NextAuth from "next-auth"
import Credentials  from "next-auth/providers/credentials"

export const { signIn, signOut, auth,handlers } = NextAuth({
  providers: [
    Credentials({
      credentials:{
        username:{label:"Username"},
        password:{label:"Password",type:"password"}
      },
      async authorize(request) {
              //if(!request.username)
              const user = {id:"123",username:"natan"}
              return user;
      },
    })  
  ],
})

// "use server";
// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// export const login = async (values: any) => {
//   const { userName, password } = values;
//   try {
//     await signIn("credentials", {
//       userName,
//       password,
//       redirectTo: DEFAULT_LOGIN_REDIRECT,
//     });
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { error: "Invalid credentials!" };
//         default:
//           return { error: "Something went wrong!" };
//       }
//     }

//     throw error;
//   }
// };