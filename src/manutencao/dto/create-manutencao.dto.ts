import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateManutencaoDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  veiculoId: number;

  @Type(() => Number)
  @IsInt()
  tipoServicoId: number;

  @Type(() => Number)
  @IsInt()
  manutencaoTipo: number;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  quilometragem: number;

  @IsString()
  @IsNotEmpty()
  iniciado: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  valor?: number;

  @Type(() => Number)
  @IsInt()
  status: number;
}