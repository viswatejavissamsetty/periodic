import { Test, TestingModule } from '@nestjs/testing';
import { RegularReadingsController } from './regular-readings.controller';
import { RegularReadingsService } from './regular-readings.service';

describe('RegularReadingsController', () => {
  let controller: RegularReadingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegularReadingsController],
      providers: [RegularReadingsService],
    }).compile();

    controller = module.get<RegularReadingsController>(
      RegularReadingsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
