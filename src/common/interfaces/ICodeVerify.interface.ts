export interface ICodeVerify {
  id: string;
  code: string;
  expiresAt: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
