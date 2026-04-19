import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator';
import { Apolice } from '../../apolice/entities/apolice.entity';
import { Plano } from '../../plano/entities/plano.entity';

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

  @Column({ nullable: false })
  idade!: number;
  
  @CreateDateColumn()
  dataCadastro!: Date;


  @OneToMany(() => Apolice, (apolice) => apolice.usuario)
  apolice!: Apolice[]

  @OneToMany(() => Plano, (plano) => plano.usuario)
  plano!: Plano[]

}