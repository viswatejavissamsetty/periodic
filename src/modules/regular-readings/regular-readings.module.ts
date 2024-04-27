import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegularReadingsController } from './regular-readings.controller';
import {
  RegularReadings,
  RegularReadingsSchema,
} from './regular-readings.model';
import { RegularReadingsService } from './regular-readings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RegularReadings.name,
        schema: RegularReadingsSchema,
      },
    ]),
  ],
  controllers: [RegularReadingsController],
  providers: [RegularReadingsService],
})
export class RegularReadingsModule {}
