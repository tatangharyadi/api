import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @Column({ nullable: true })
    imagePath: string;
}
