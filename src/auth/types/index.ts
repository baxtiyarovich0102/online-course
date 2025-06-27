export type JwtPayload = {
  sub: number;
  email: string;
  role: 'student' | 'admin' | 'teacher';
};
