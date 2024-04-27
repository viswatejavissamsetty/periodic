import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';

@Schema({
  timeseries: { timeField: 'CT', metaField: 'MN' },
  collection: 'Devices:Readings',
})
export class RegularReadings {
  @Prop({ required: true })
  MN: string;

  @Prop({ required: false })
  Bal?: number;

  @Prop({ required: false })
  Cost?: number;

  @Prop({ required: false })
  TOU?: number;

  @Prop({ required: true, type: [Number] })
  V: number[];

  @Prop({ required: true, type: [Number] })
  A: number[];

  @Prop({ required: true, type: [Number] })
  pf: number[];

  @Prop({ required: true, type: [Number] })
  ang: number[];

  @Prop({ required: true, type: [Number] })
  Hz: number[];

  @Prop({ required: true, type: [Number] })
  WH: number[];

  @Prop({ required: true })
  H: number;

  @Prop({ required: true })
  tm: number;

  @Prop({ required: true, type: [Number] })
  Vmm: number[];

  @Prop({ required: true, type: [Number] })
  Amm: number[];

  @Prop({ required: true, type: [Number] })
  pfmm: number[];

  @Prop({ required: true, type: [Number] })
  angmm: number[];

  @Prop({ required: true, type: [Number] })
  Hzmm: number[];

  @Prop({ required: true, set: (v) => new Date(v * 1000) })
  S: number;

  @Prop({ required: true, set: (v) => new Date(v * 1000) })
  CT: Date;
}
export const RegularReadingsSchema =
  SchemaFactory.createForClass(RegularReadings);
export type RegularReadingsModel = Model<HydratedDocument<RegularReadings>>;
