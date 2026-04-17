import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "tb_apolices" })
export class Apolice {

  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  dataContratacao!: Date;

  @IsNotEmpty()
  @Column({ length: 255 })
  status!: string;

  @IsNotEmpty()
  @Column('decimal', {precision: 8, scale: 2 })
  valorFinal!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.apolice, {
      onDelete: "CASCADE"
  }) 
  usuario: Usuario;
  
  @ManyToOne(() => Plano, (plano) => plano.apolice, {
      onDelete: "CASCADE"
  })
  plano: Plano;
}