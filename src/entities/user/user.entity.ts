import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  telefone: string;

  @Column({ unique: true })
  nomeUsuario: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  profileImage?: string;
}
