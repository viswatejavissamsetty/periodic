import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AutoCompleteResponse } from '@aimeter/aimeter-backend-library';
import {
  CommonAutocompleteQueryDTO,
  CommonQueryDTO,
} from '../../dtos/common.query.dto';
import { DailySummaryDTO } from './daily-summary.dtos';
import { DailySummary, DailySummaryModel } from './daily-summary.model';

@Injectable()
export class DailySummaryService {
  private readonly logger = new Logger(DailySummaryService.name);
  constructor(
    @InjectModel(DailySummary.name)
    private readonly dailySummary: DailySummaryModel,
  ) {}

  async create(MN: string, data: DailySummaryDTO) {
    this.logger.log(`create daily summary for ${MN}`);
    return await this.dailySummary.create({ MN, ...data });
  }

  async findAllWithQuery(query: CommonQueryDTO) {
    const dailySummary = await this.dailySummary
      .aggregate([
        {
          $match: {
            MN: { $regex: query.MN, $options: 'i' },
            CT: {
              $gt: new Date(query.fromDate),
              $lt: new Date(query.toDate),
            },
          },
        },
        {
          $project: {
            _id: 0,
            __v: 0,
            updatedAt: 0,
          },
        },
        {
          $group: {
            _id: '$MN',
            data: { $push: '$$ROOT' },
          },
        },
        {
          $project: {
            _id: 0,
            MN: '$_id',
            data: 1,
          },
        },
        {
          $project: {
            'data.MN': 0,
          },
        },
      ])
      .allowDiskUse(true);

    return dailySummary;
  }

  async autocomplete(
    query: CommonAutocompleteQueryDTO,
  ): Promise<AutoCompleteResponse> {
    const results = await this.dailySummary.aggregate([
      {
        $match: { MN: { $regex: query.MN, $options: 'i' } },
      },
      {
        $group: {
          _id: '$MN',
        },
      },
      {
        $limit: 10,
      },
    ]);
    return results
      .map((item) => item._id)
      .map((MN) => ({ title: MN, value: MN }));
  }
}
