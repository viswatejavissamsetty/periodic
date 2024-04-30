import {
  EncryptDecryptService,
  MeterNumber,
} from '@aimeter/aimeter-backend-library';
import { CacheKey } from '@nestjs/cache-manager';
import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  CommonAutocompleteQueryDTO,
  CommonQueryDTO,
} from '../../dtos/common.query.dto';
import { DailySummaryDTO } from './daily-summary.dtos';
import { DailySummaryService } from './daily-summary.service';

@Controller('daily-summary')
export class DailySummaryController {
  constructor(
    private readonly dailySummaryService: DailySummaryService,
    private readonly encryptDecryptService: EncryptDecryptService,
  ) {}

  @EventPattern('allmeters/daily/ms/+')
  async readings(@MeterNumber() MN: string, @Payload() payload: string) {
    const decryptedData =
      await this.encryptDecryptService.decrypt<DailySummaryDTO>(MN, payload);
    return this.dailySummaryService.create(MN, decryptedData);
  }

  @Get()
  @CacheKey('daily-summary')
  async findAllWithQuery(@Query() query: CommonQueryDTO) {
    return this.dailySummaryService.findAllWithQuery(query);
  }

  @Get('autocomplete')
  async autocomplete(@Query() query: CommonAutocompleteQueryDTO) {
    return this.dailySummaryService.autocomplete(query);
  }
}
