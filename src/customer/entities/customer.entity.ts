import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import {
  IsNumber,
  IsString,
  Max,
  IsEmail,
  IsDate,
  MaxLength,
  Min,
  MinLength,
  IsNotEmpty,
  IsOptional,
  max,
} from 'class-validator';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  firstName: string;
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  lastName: string;

  @Column({ name: 'email' })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email!: string;

  @Column()
  @MinLength(6)
  @IsString()
  password: string;

  // @Column()
  // @MinLength(2)
  // @IsString()
  // city: string;

  @Column()
  @IsNumber()
  // @MinLength(10)
  // @MaxLength(10)
  phone: Number;

  @Column()
  @IsOptional()
  comapanyName: string;

  @Column()
  @IsOptional()
  numberOfVehicle: number;

  @Column()
  @IsOptional()
  agencyLoaction: string;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @CreateDateColumn()
  updated_at: Date; // Update date

  //   @UpdateDateColumn()
  // updated_at: Date; // Last updated date

  // @DeleteDateColumn()
  // deleted_at: Date; // Deletion date
}
