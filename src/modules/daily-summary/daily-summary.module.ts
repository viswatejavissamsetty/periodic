import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailySummaryController } from './daily-summary.controller';
import { DailySummary, DailySummarySchema } from './daily-summary.model';
import { DailySummaryService } from './daily-summary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DailySummary.name,
        schema: DailySummarySchema,
      },
    ]),
  ],
  controllers: [DailySummaryController],
  providers: [DailySummaryService],
})
export class DailySummaryModule {}
