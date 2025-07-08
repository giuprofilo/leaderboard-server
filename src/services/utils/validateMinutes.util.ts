import { NotFoundException } from "@nestjs/common";

const RANGE_MINUTES: number = 15;

export function validateMinutes(dateParam: Date): boolean {

	  if (!dateParam) {
    throw new NotFoundException('Parâmetro inválido');
  }
  
  const now = new Date();
  const date = new Date(dateParam);
  const diffInMs = now.getTime() - date.getTime();
  
  const fifteenMinutesInMs = RANGE_MINUTES * 60 * 1000;
  
	return diffInMs < fifteenMinutesInMs;
}