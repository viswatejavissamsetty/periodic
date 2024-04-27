import {
  AutoCompleteResponse,
  DevicesService,
} from '@aimeter/aimeter-backend-library';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { CommonAutocompleteQueryDTO } from '../../dtos/common.query.dto';
import { GetReadingsQueryDTO, MeterReadingsDTO } from './regular-readings.dtos';
import {
  RegularReadings,
  RegularReadingsModel,
} from './regular-readings.model';

@Injectable()
export class RegularReadingsService {
  private readonly logger = new Logger(RegularReadingsService.name);

  constructor(
    private readonly devicesService: DevicesService,
    @InjectModel(RegularReadings.name)
    private readonly readingsModel: RegularReadingsModel,
  ) {}

  async create(MN: string, payload: MeterReadingsDTO) {
    return await this.readingsModel.create({ MN, ...payload });
  }

  async autocomplete(
    query: CommonAutocompleteQueryDTO,
  ): Promise<AutoCompleteResponse> {
    const results = await this.readingsModel.aggregate([
      {
        $match: {
          MN: { $regex: query.MN, $options: 'i' },
        },
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

  async getReadings(query: GetReadingsQueryDTO) {
    const device = await this.devicesService.findOne({ MN: query.MN });

    if (!device) {
      return { MN: query.MN, data: [], length: 0 };
    }

    const date = moment(query.date || Date.now());
    const start = date.startOf('day').toDate();
    const end = date.endOf('day').toDate();

    const data = await this.readingsModel.find(
      {
        MN: query.MN,
        CT: {
          $gte: start,
          $lt: end,
        },
      },
      query.keys?.length
        ? {
            _id: 0,
            ...(typeof query.keys === 'string'
              ? { [query.keys]: 1 }
              : query.keys.reduce((prev, curr) => {
                  return Object.assign(prev, { [curr]: 1 });
                }, {})),
            CT: 1,
            H: 1,
          }
        : {
            _id: 0,
            __v: 0,
            MN: 0,
            S: 0,
          },
    );
    return { MN: query.MN, length: data.length, aiMT: device.aiMT, data };
  }

  async getMeterDetails() {
    return await this.readingsModel.aggregate([
      { $sort: { CT: 1 } },
      {
        $group: {
          _id: '$MN',
          CT: { $last: '$CT' },
          WH: { $last: '$WH' },
          A: { $last: '$A' },
          Hz: { $last: '$Hz' },
          TOU: { $last: '$TOU' },
          V: { $last: '$V' },
          pf: { $last: '$pf' },
        },
      },
    ]);
  }

  async getLastReading(MN: string) {
    const reading = await this.readingsModel.findOne(
      { MN },
      {
        _id: 0,
        WH: 1,
        TOU: 1,
        V: 1,
        A: 1,
        Hz: 1,
        CT: 1,
      },
      {
        sort: { CT: -1 },
        lean: true,
        limit: 1,
      },
    );
    return reading;
  }
}
