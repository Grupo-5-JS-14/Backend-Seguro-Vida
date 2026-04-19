import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Apolice } from "../../apolice/entities/apolice.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: "tb_planos" })
export class Plano {

  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome!: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  descricao!: string;

  @IsNotEmpty()
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  valor!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.plano, {
    onDelete: "CASCADE"
  })
  usuario!: Usuario;

  @ManyToOne(() => Apolice, (apolice) => apolice.plano, {
    onDelete: "CASCADE"
  })
  apolice!: Apolice;
}