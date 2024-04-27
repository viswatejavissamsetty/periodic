import { IsNumber, IsNotEmpty } from 'class-validator';
import { CommonPayloadDTO } from '@aimeter/aimeter-backend-library';

export class DailySummaryDTO extends CommonPayloadDTO {
  @IsNumber()
  @IsNotEmpty()
  readonly AT: number;

  @IsNumber()
  @IsNotEmpty()
  readonly Bat: number;

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly Bal: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly Cost: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly TOU: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly V: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly A: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly pf: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly ang: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly Hz: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly WH: number[][];

  @IsNumber()
  @IsNotEmpty()
  readonly H: number;

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly tm: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly Vmm: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly Amm: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly pfmm: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly angmm: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly Hzmm: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly T: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly On: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly PT: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly CD: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly Share: number[][];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly EB: number[][];

  @IsNotEmpty()
  @IsNumber()
  readonly CT: Date;
}
