import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { AiMeterMoment } from '@aimeter/aimeter-backend-library';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CommonQueryDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly MN: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  @Transform((o) => AiMeterMoment(o.value, 'YYYY-MM-DD').toISOString())
  readonly fromDate: string = AiMeterMoment().subtract(1, 'week').toISOString();

  @IsOptional()
  @ValidateIf((o) => o.fromDate !== undefined)
  @IsDateString()
  @ApiProperty({ required: false })
  @Transform((o) => AiMeterMoment(o.value, 'YYYY-MM-DD').toISOString())
  readonly toDate: string = AiMeterMoment().toISOString();
}

export class CommonAutocompleteQueryDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly MN: string;
}
