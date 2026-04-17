import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import  { Apolice } from '../../apolice/entities/apolice.entity';
import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator';

@Entity({name: 'tb_usuarios'})
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({length: 255, nullable: false, unique: true})
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({length: 255, nullable: false }) 
  senha: string;

  @Column({length: 5000 }) 
  foto: string;

  @Min(0)
  @Column({ nullable: false })
  idade: number;

  // @OneToMany(() => Apolice, (apolice) => apolice.usuario)
  // apolices: Apolice[];

}
