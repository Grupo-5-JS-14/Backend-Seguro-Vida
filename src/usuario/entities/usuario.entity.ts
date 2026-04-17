import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator';
import { Apolice } from '../../apolice/entities/apolice.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {

  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column({ length: 100 })
  nome!: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false, unique: true })
  usuario!: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  senha!: string;

  @Column({ length: 5000, nullable: true })
  foto!: string;

  @Min(0)
  @Column({ nullable: false })
  idade!: number;

  @OneToMany(() => Apolice, (apolice) => apolice.usuario)
  apolices!: Apolice[];
}