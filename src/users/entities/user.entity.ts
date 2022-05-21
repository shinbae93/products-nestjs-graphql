import { Role } from 'src/auth/entities/role.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role: Role) => role.users, { eager: true })
  role: Role;

  @OneToMany(() => Product, (product: Product) => product.user, { eager: true })
  products: Product[];
}
