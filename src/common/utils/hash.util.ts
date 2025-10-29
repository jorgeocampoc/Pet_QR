import * as bcrypt from 'bcryptjs';
const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashPassword);
}

