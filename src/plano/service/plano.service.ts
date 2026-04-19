import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Plano } from "../entities/plano.entity";

@Injectable()
export class PlanoService {

  constructor(
    @InjectRepository(Plano)
    private planoRepository: Repository<Plano>
  ) {}

  async findAll(): Promise<Plano[]> {

    const planos = await this.planoRepository.find({
      relations: { usuario: true }
    });

    if (planos.length === 0)
      throw new NotFoundException('Nenhum plano encontrado!');

    return planos;
  }

  async findById(id: number): Promise<Plano> {

    const plano = await this.planoRepository.findOne({
      where: { id },
      relations: { apolice: true, usuario: true }
    });

    if (!plano)
      throw new NotFoundException('Plano não encontrado!');

    return plano;
  }

  async findByNome(nome: string): Promise<Plano[]> {

    const plano = await this.planoRepository.find({
      where: {
        nome: ILike(`%${nome}%`)
      }
    });

    if (plano.length === 0)
      throw new NotFoundException('Nenhum plano encontrado com esse nome!');

    return plano;
  }

  async create(plano: Plano): Promise<Plano> {
    return await this.planoRepository.save(plano);
  }

  async update(plano: Plano): Promise<Plano> {

    await this.findById(plano.id);
    return await this.planoRepository.save(plano);
  }

  async delete(id: number): Promise<void> {

    await this.findById(id);

    const result = await this.planoRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('Plano não encontrado!');
  }
}