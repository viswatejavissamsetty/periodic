import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CommonPayloadDTO } from '@aimeter/aimeter-backend-library';

export class MeterReadingsDTO extends CommonPayloadDTO {
  @IsNumber()
  @IsNotEmpty()
  readonly Bal: number;

  @IsNumber()
  @IsNotEmpty()
  readonly Cost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly TOU: number;

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly V: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly A: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly pf: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly ang: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly Hz: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly WH: number[];

  @IsNumber()
  @IsNotEmpty()
  readonly H: number;

  @IsNumber()
  @IsNotEmpty()
  readonly tm: number;

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly Vmm: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly Amm: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly pfmm: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly angmm: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly Hzmm: number[];

  @IsNumber()
  @IsNotEmpty()
  readonly CT: number;
}
export class GetReadingsQueryDTO {
  @IsNotEmpty()
  @IsString()
  readonly MN: string;

  @IsString()
  @IsOptional()
  readonly date?: Date;

  @IsString({ each: true })
  @IsOptional()
  keys: string | string[];
}
