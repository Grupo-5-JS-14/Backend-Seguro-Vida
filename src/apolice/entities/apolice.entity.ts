import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Plano } from "../../plano/entities/plano.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: "tb_apolices" })
export class Apolice {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @CreateDateColumn()
  dataContratacao!: Date;

  @ApiProperty()
  @Column()
  status!: boolean;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2 })
  valorFinal!: number;

  
  @ManyToOne(() => Usuario, (usuario) => usuario.apolice, {
    onDelete: "CASCADE"
  })
  usuario!: Usuario;

  @ManyToOne(() => Plano, (plano) => plano.apolice, {
    onDelete: "CASCADE"
  })
  plano!: Plano;
}