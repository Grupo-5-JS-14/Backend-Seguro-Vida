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
    const lista = await this.apoliceRepository.find({});
    if (lista.length === 0)
      throw new NotFoundException('Nenhuma apólice encontrada!');
    return lista;
  }

  // Versão admin: traz relações de usuário e plano
  async findAllAdmin(): Promise<Apolice[]> {
    const lista = await this.apoliceRepository.find({
      relations: { usuario: true, plano: true },
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

  private calcularValor(apolice: Apolice): number {

    let valor = Number(apolice.plano.valor);

    // Regra para idosos
    if (apolice.usuario.idade > 60) {
      valor *= 1.25;
    }

    // Regra para adultos +40 até 59 anos
    if (apolice.usuario.idade > 40 && apolice.usuario.idade < 60) {
      valor *= 1.10;
    }

    // Regra para jovens +18 até 39 anos
    if (apolice.usuario.idade > 18 && apolice.usuario.idade < 40) {
      valor *= 1.05;
    }

    return Number(valor.toFixed(2));
  }

  async create(apolice: Apolice): Promise<Apolice> {
    if (!apolice.usuario || !apolice.plano) {
      throw new BadRequestException(
        'Usuário e plano são obrigatórios!'
      );
    }
    // Status 
    apolice.status = true;
    // Calcula 
    apolice.valorFinal =
      this.calcularValor(apolice);

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
