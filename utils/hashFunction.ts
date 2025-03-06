import bcrypt from 'bcrypt';

const saltRound = 10;
export const hashFunction = (plainPassword: string): Promise<string> => {
  const finalPassword = bcrypt.hash(plainPassword, saltRound);
  return finalPassword;
};
