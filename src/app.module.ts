import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  AiMeterModule,
  DevicesModule,
  EncryptDecryptModule,
  MQTTClientModule,
} from '@aimeter/aimeter-backend-library';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { RegularReadingsModule } from './modules/regular-readings/regular-readings.module';
import { DailySummaryModule } from './modules/daily-summary/daily-summary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL),
    MQTTClientModule.forRoot(),
    DevicesModule.forRoot(),
    AiMeterModule.forRoot(),
    EncryptDecryptModule.forRoot(),
    CacheModule.register({ ttl: 1 * 60, isGlobal: true }),
    RegularReadingsModule,
    DailySummaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
