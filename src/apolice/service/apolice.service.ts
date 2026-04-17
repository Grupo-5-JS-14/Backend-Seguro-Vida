import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Apolice } from '../entities/apolice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ApoliceService {
  constructor(
    @InjectRepository(Apolice)
    private apoliceRepository: Repository<Apolice>,
  ) { } 
  
  async findAll(): Promise<Apolice[]> {
    return await this.apoliceRepository.find();
  }


  async findById(id: number): Promise<Apolice>{
    const apolice = await this.apoliceRepository.findOne({
        where: { id },
        relations: { usuario:true, plano:true  }
    });
    if (!apolice) {
    throw new HttpException("Apolice não cadastrada", HttpStatus.NOT_FOUND);
    } 

    return apolice;
  }

  async findByStatus(status: string): Promise<Apolice[]>{
    return await this.apoliceRepository.find({
        where: {
            status: ILike(`%${status}%`)
        }
    }); 
  }

  async create(apolice: Apolice): Promise<Apolice> {
   return await this.apoliceRepository.save(apolice);  
  } 

  async update(apolice: Apolice): Promise<Apolice> { 
      await this.findById(apolice.id); 

      return await this.apoliceRepository.save(apolice); 
  } 

async delete(id: number): Promise<{ message: string }> {
    await this.findById(id);

    await this.apoliceRepository.delete(id);

    return { message: 'Apolice deletado com sucesso' };
  }
}

