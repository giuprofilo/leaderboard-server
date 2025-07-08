import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdatePointsDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Os pontos não podem ser negativos' })
  points: number;
}
