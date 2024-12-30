import {
  Column,
  Model,
  AllowNull,
  DataType,
  Table,
  PrimaryKey,
} from 'sequelize-typescript';
import { Description } from '../types';

@Table({
  tableName: 'phones',
})
export class Phones extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
    id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'namespace_id',
  })
    namespaceId: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    name: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    field: 'capacity_available',
  })
    capacityAvailable: string[];

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    capacity: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'price_regular',
  })
    priceRegular: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'price_discount',
  })
    priceDiscount: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    field: 'colors_available',
  })
    colorsAvailable: string[];

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    color: string;

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
    images: string[];

  @Column({
    type: DataType.JSONB,
  })
    description: Description[];

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    screen: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    resolution: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    processor: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    ram: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    camera: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    zoom: string;

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
    cell: string[];
}
