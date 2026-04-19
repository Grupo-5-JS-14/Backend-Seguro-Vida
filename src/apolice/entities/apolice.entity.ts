import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Plano } from "../../plano/entities/plano.entity";

@Entity({ name: "tb_apolices" })
export class Apolice {

  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @CreateDateColumn()
  dataContratacao!: Date;

  @IsNotEmpty()
  @Column({ length: 255 })
  status!: string;

  @IsNotEmpty()
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