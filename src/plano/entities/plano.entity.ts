import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Apolice } from "../../apolice/entities/apolice.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_planos" })
export class Plano {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome!: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  descricao!: string;

  @IsNotEmpty()
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  @ApiProperty()
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