export interface ChartsCI {
  sumTotal: string;
  total:    number;
  readings: Reading[];
}

export interface Reading {
  date:        Date;
  lastMonth:   LastMonth;
  cubicMeters: number;
}

export interface LastMonth {
  date:  Date;
  value: number;
}
