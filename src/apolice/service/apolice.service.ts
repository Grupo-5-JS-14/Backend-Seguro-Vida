import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Apolice } from '../entities/apolice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApoliceService {

  constructor(
    @InjectRepository(Apolice)
    private apoliceRepository: Repository<Apolice>,
  ) {}

  async findAll(): Promise<Apolice[]> {

    const lista = await this.apoliceRepository.find({
    });

    if (lista.length === 0)
      throw new NotFoundException('Nenhuma apólice encontrada!');

    return lista;
  }

  async findById(id: number): Promise<Apolice> {

    const apolice = await this.apoliceRepository.findOne({
      where: { id },
      relations: { usuario: true, plano: true }
    });

    if (!apolice)
      throw new NotFoundException('Apólice não encontrada!');

    return apolice;
  }

  async create(apolice: Apolice): Promise<Apolice> {

    if (!apolice.usuario || !apolice.plano)
      throw new BadRequestException('Usuário e Plano são obrigatórios!');

    return await this.apoliceRepository.save(apolice);
  }

  async update(apolice: Apolice): Promise<Apolice> {

    await this.findById(apolice.id);

    return await this.apoliceRepository.save(apolice);
  }

  async delete(id: number): Promise<void> {

    await this.findById(id);

    const result = await this.apoliceRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('Apólice não encontrada!');
  }
}