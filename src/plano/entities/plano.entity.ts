import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Apolice } from "../../apolice/entities/apolice.entity";


@Entity({name: "tb_planos"})
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


    @OneToMany(() => Apolice, (apolice) => apolice.plano)
    apolices!: Apolice[];


}

