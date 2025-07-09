import { NotFoundException } from "@nestjs/common";

export function validateMinutes(dateParam: Date, rangeMinutes: number): boolean {
	if (!dateParam) {
    throw new NotFoundException('Parâmetro inválido');
  }
  const EXPIRATION_TIME: number = rangeMinutes;
  const now = new Date();
  const date = new Date(dateParam);
  const diffInMs = Math.abs(now.getTime() - date.getTime());
  
  const expirationTimeInMs = EXPIRATION_TIME * 60 * 1000;
  
	return diffInMs < expirationTimeInMs;
}