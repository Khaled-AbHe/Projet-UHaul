import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  depotName: string;

  @Column()
  lon: number;

  @Column()
  lat: number;

  // Reference: https://typeorm.io/docs/relations/many-to-one-one-to-many-relations
  @OneToMany(() => Vehicle, (vehicle) => vehicle.location, { eager: true })
  inventory: Vehicle[];
}
