import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'edb', name: 'edb_user' })
export class UserEntity extends BaseEntity {
  @ApiProperty({ example: 1, description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'example@mail.com', description: 'Email' })
  @Column({ unique: true })
  email: string;
  @ApiProperty({ description: 'Password' })
  @Column()
  password: string;
  @ApiProperty({ example: 'John', description: 'Firstname' })
  @Column({ name: 'first_name' })
  firstName: string;
  @ApiProperty({ example: 'Doe', description: 'Lastname' })
  @Column({ name: 'last_name' })
  lastName: string;
  @ApiProperty({ example: 'Novosibirsk', description: 'City' })
  @Column()
  city: string;
  @ApiProperty({ example: '+79991234567', description: 'Phone' })
  @Column({ unique: true })
  phone: string;
  @ApiProperty({ example: 'dark', description: 'Theme' })
  @Column()
  theme: string;
  @ApiProperty({ example: 'en', description: 'Language' })
  @Column()
  lang: string;
  @ApiProperty({ description: 'Created at' })
  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createdAt: Date;
  @ApiProperty({ description: 'Updated at' })
  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;
}
