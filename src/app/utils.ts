
import bcrypt from "bcryptjs";
export const passwordEncryption = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

export const verifyPasswords = async (
  password: string,
  encryptedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, encryptedPassword);
};

