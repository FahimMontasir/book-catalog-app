import bcrypt from 'bcrypt';
import configs from '../configs';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(configs.bcrypt_salt_rounds));
};
