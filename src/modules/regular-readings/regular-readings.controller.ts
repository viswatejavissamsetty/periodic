import {
  EncryptDecryptService,
  MeterNumber,
  MqttPayload,
  UseAiMeterRoleGuard,
} from '@aimeter/aimeter-backend-library';
import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CommonAutocompleteQueryDTO } from '../../dtos/common.query.dto';
import { GetReadingsQueryDTO, MeterReadingsDTO } from './regular-readings.dtos';
import { RegularReadingsService } from './regular-readings.service';

@Controller('regular-readings')
@ApiTags('Regular Readings')
export class RegularReadingsController {
  constructor(
    private readonly regularReadingsService: RegularReadingsService,
    private readonly encryptDecryptService: EncryptDecryptService,
  ) {}

  @EventPattern('allmeters/read/ms/+')
  async readings(@MeterNumber() MN: string, @Payload() payload: MqttPayload) {
    const decryptedData =
      await this.encryptDecryptService.decrypt<MeterReadingsDTO>(
        MN,
        payload.data,
      );

    return this.regularReadingsService.create(MN, decryptedData);
  }

  @Get()
  async getReadings(@Query() query: GetReadingsQueryDTO) {
    return this.regularReadingsService.getReadings(query);
  }

  @Get('autocomplete')
  @UseAiMeterRoleGuard(
    'SUPERADMIN',
    'ADMIN',
    'STAFF',
    'COMPANY_ADMIN',
    'COMPANY_STAFF',
  )
  async autocomplete(@Query() query: CommonAutocompleteQueryDTO) {
    return this.regularReadingsService.autocomplete(query);
  }

  @Get('list')
  async getMeterDetails() {
    return this.regularReadingsService.getMeterDetails();
  }

  @MessagePattern('READINGS-GET_LAST_READING')
  async getLastReading(@Payload() payload: { MN: string }) {
    const { MN } = payload;
    return this.regularReadingsService.getLastReading(MN);
  }
}
