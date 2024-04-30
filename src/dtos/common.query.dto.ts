import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { AiMeterMoment } from '@aimeter/aimeter-backend-library';
import { Transform } from 'class-transformer';

export class CommonQueryDTO {
  @IsString()
  @IsNotEmpty()
  readonly MN: string;

  @IsOptional()
  @IsDateString()
  @Transform((o) => AiMeterMoment(o.value, 'YYYY-MM-DD').toISOString())
  readonly fromDate: string = AiMeterMoment().subtract(1, 'week').toISOString();

  @IsOptional()
  @ValidateIf((o) => o.fromDate !== undefined)
  @IsDateString()
  @Transform((o) => AiMeterMoment(o.value, 'YYYY-MM-DD').toISOString())
  readonly toDate: string = AiMeterMoment().toISOString();
}

export class CommonAutocompleteQueryDTO {
  @IsString()
  @IsNotEmpty()
  readonly MN: string;
}
