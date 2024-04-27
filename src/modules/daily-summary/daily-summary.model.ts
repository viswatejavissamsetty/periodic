import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';

@Schema({
  timeseries: { timeField: 'CT', metaField: 'MN' },
  collection: 'Devices:DailySummary',
})
export class DailySummary {
  @Prop({ required: true })
  MN: string;

  @Prop({ required: true })
  AT: number;

  @Prop({ required: true })
  Bat: number;

  @Prop({ required: false, type: [Number] })
  Bal?: number[];

  @Prop({ required: false, type: [Number] })
  Cost?: number[];

  @Prop({ required: false, type: [Number] })
  TOU?: number[];

  @Prop({ required: true, type: [[Number]] })
  V: number[][];

  @Prop({ required: true, type: [[Number]] })
  A: number[][];

  @Prop({ required: true, type: [[Number]] })
  pf: number[][];

  @Prop({ required: true, type: [[Number]] })
  ang: number[][];

  @Prop({ required: true, type: [Number] })
  Hz: number[];

  @Prop({ required: true, type: [[Number]] })
  WH: number[][];

  @Prop({ required: true, type: [Number] })
  tm: number[];

  @Prop({ required: true, type: [[Number]] })
  Vmm: number[][];

  @Prop({ required: true, type: [[Number]] })
  Amm: number[][];

  @Prop({ required: true, type: [[Number]] })
  pfmm: number[][];

  @Prop({ required: true, type: [[Number]] })
  angmm: number[][];

  @Prop({ required: true, type: [[Number]] })
  Hzmm: number[][];

  @Prop({ required: true, type: [[Number]], default: [] })
  T: number[][];

  @Prop({ required: true, type: [[Number]], default: [] })
  On: number[][];

  @Prop({ required: true, type: [[Number]], default: [] })
  PT: number[][];

  @Prop({ required: true, type: [[Number]], default: [] })
  CD: number[][];

  @Prop({ required: true, type: [[Number]], default: [] })
  Share: number[][];

  @Prop({ required: true, type: [[Number]], default: [] })
  EB: number[][];

  @Prop({ required: true })
  S: number;

  @Prop({ required: true })
  CT: number;
}
export const DailySummarySchema = SchemaFactory.createForClass(DailySummary);
export type DailySummaryModel = Model<HydratedDocument<DailySummary>>;
