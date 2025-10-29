export interface JwtPayload {
  sub: string;
  email: string;
  role?: string;
  isActive?: boolean;
  verifyEmail?: boolean;
  iat?: number;
  exp?: number;
}
