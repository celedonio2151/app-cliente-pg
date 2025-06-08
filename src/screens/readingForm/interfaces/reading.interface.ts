import { WaterMeter } from "../../Meters/interfaces/meter.interface";

export interface Reading {
  createdAt:   Date;
  updatedAt:   Date;
  deletedAt:   Date | null;
  _id:         string;
  date:        Date;
  beforeMonth: Month;
  lastMonth:   Month;
  cubicMeters: number;
  balance:     number;
  meterImage:  null;
  description: string;
  waterMeter:  WaterMeter;
  invoice:     null;
}

export interface Month {
  date:  string;
  value: string;
}

export type ReadingForm = {
  water_meterId:  string;
  date:           string;
  beforeMonth:    Month;
  lastMonthValue: string;
  cubicMeters:    string;
  balance:        string;
};
