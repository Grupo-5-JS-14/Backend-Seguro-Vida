import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Apolice } from '../entities/apolice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../../usuario/entities/usuario.entity';
import { Plano } from '../../plano/entities/plano.entity';

@Injectable()
export class ApoliceService {
  constructor(
    @InjectRepository(Apolice)
    private readonly apoliceRepository: Repository<Apolice>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Plano)
    private readonly planoRepository: Repository<Plano>,
  ) {}

  async findAll(): Promise<Apolice[]> {
    const lista = await this.apoliceRepository.find({
      relations: {
        usuario: true,
        plano: true,
      },
    });

    if (lista.length === 0) {
      throw new NotFoundException('Nenhuma apólice encontrada!');
    }

    return lista;
  }

  async findAllAdmin(): Promise<Apolice[]> {
    const lista = await this.apoliceRepository.find({
      relations: {
        usuario: true,
        plano: true,
      },
    });

    if (lista.length === 0) {
      throw new NotFoundException('Nenhuma apólice encontrada!');
    }

    return lista;
  }

  async findById(id: number): Promise<Apolice> {
    const apolice = await this.apoliceRepository.findOne({
      where: { id },
      relations: {
        usuario: true,
        plano: true,
      },
    });

    if (!apolice) {
      throw new NotFoundException('Apólice não encontrada!');
    }

    return apolice;
  }

  private calcularValor(plano: Plano, usuario: Usuario): number {
    let valor = Number(plano.valor);
    const idade = Number(usuario.idade);

    if (isNaN(valor)) {
      throw new BadRequestException('Valor do plano inválido!');
    }

    if (isNaN(idade)) {
      throw new BadRequestException('Idade do usuário inválida!');
    }

    if (idade > 60) {
      valor *= 1.25;
    } else if (idade > 40 && idade < 60) {
      valor *= 1.10;
    } else if (idade >= 18 && idade < 40) {
      valor *= 1.05;
    }

    return Number(valor.toFixed(2));
  }

  async create(apolice: Apolice): Promise<Apolice> {
    if (!apolice.usuario?.id || !apolice.plano?.id) {
      throw new BadRequestException('Usuário e plano são obrigatórios!');
    }

    const usuario = await this.usuarioRepository.findOne({
      where: {
        id: apolice.usuario.id,
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    const plano = await this.planoRepository.findOne({
      where: {
        id: apolice.plano.id,
      },
    });

    if (!plano) {
      throw new NotFoundException('Plano não encontrado!');
    }

    const valorFinal = this.calcularValor(plano, usuario);

    const novaApolice = this.apoliceRepository.create({
      dataContratacao: new Date(),
      status: true,
      valorFinal,
      usuario,
      plano,
    });

    return await this.apoliceRepository.save(novaApolice);
  }

  async update(apolice: Apolice): Promise<Apolice> {
    await this.findById(apolice.id);

    return await this.apoliceRepository.save(apolice);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);

    const result = await this.apoliceRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Apólice não encontrada!');
    }
  }
}