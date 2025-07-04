import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'codeVerify' })
export class CodeVerify {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @OneToOne(() => User, (user) => user.verificationCode)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}