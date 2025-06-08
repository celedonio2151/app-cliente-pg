import { WaterMeter } from '../../Meters/interfaces/meter.interface';

export interface  Readings {
  limit?:    number;
  offset?:   number;
  total:     number;
  readings:  Reading[];
}

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
  invoice:     Invoice | null;
}

export interface Month {
  date:  Date;
  value: number;
}

export interface Invoice {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  _id:       string;
  amountDue: number;
  isPaid:    boolean;
  status:    boolean;
}
