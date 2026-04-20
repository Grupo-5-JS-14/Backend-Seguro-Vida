import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator';
import { Apolice } from '../../apolice/entities/apolice.entity';
import { Plano } from '../../plano/entities/plano.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {

  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty({message: 'Nome nao pode ficar vazio.'})
  @Column({ length: 100 })
  @ApiProperty({example:"seuemail@email.com"})
  nome!: string;

  @IsEmail({},{message:'Email precisa ser valido.'})
  @IsNotEmpty({message:'Email do Usuario precisa ser prenchido.'})
  @Column({ length: 255, nullable: false, unique: true })
  usuario!: string;

  @MinLength(8,{message:'Senha precisa esta com 8 digitos.'})
  @IsNotEmpty({message:'Senha precisa estar preenchida.'})
  @Column({ length: 255, nullable: false })
  @ApiProperty({example:"Digite sua senha."})
  senha!: string;

  @Column({ length: 5000, nullable: true })
  @ApiProperty()
  foto!: string;

  @Column({ nullable: false })
  @ApiProperty({example:"Digite sua idade."})
  idade!: number;
  
  @CreateDateColumn()
  dataCadastro!: Date;


  @OneToMany(() => Apolice, (apolice) => apolice.usuario)
  apolice!: Apolice[]

  @OneToMany(() => Plano, (plano) => plano.usuario)
  plano!: Plano[]

}