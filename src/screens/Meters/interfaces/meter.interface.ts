export interface Meters {
  limit?:      number;
  offset?:     number;
  total:       number;
  waterMeters: WaterMeter[];
}

export interface WaterMeter {
  createdAt:    Date;
  updatedAt:    Date;
  deletedAt:    Date | null;
  _id:          string;
  ci:           number;
  name:         string;
  surname:      string;
  meter_number: number;
  status:       boolean;
}
