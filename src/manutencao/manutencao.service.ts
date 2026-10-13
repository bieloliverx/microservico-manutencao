import { Injectable, NotFoundException, BadRequestException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManutencaoDto } from './dto/create-manutencao.dto';
import { UpdateManutencaoDto } from './dto/update-manutencao.dto';

@Injectable()
export class ManutencaoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createManutencaoDto: CreateManutencaoDto) {
  const agora = new Date();

  return this.prisma.manutencao.create({
    data: {
      veiculoId: BigInt(createManutencaoDto.veiculoId),

      tipo_servico_id: BigInt(
        createManutencaoDto.tipoServicoId,
      ),

      manutencao_tipo: createManutencaoDto.manutencaoTipo,

      manutencao_descricao: createManutencaoDto.descricao,

      manutencao_quilometragem:
        createManutencaoDto.quilometragem,

      manutencao_iniciado: new Date(
        createManutencaoDto.iniciado,
      ),

      manutencao_custo_total: createManutencaoDto.valor,

      manutencao_status: createManutencaoDto.status,

      manutencao_criado: agora,
      manutencao_atualizado: agora,
    },
  });
}

  findAll() {
    return this.prisma.manutencao.findMany();
  }

  async findOne(id: number) {
    const manutencao = await this.prisma.manutencao.findUnique({
     where: { manutencao_id: BigInt(id) },
    });
    if (!manutencao) {
      throw new NotFoundException(`Manutenção #${id} não encontrada`);
    }
    return manutencao;
  }

  async update(id: number, updateManutencaoDto: UpdateManutencaoDto) {
  await this.findOne(id);

  const {
    veiculoId,
    tipoServicoId,
    manutencaoTipo,
    descricao,
    quilometragem,
    iniciado,
    valor,
    status,
  } = updateManutencaoDto;

  return this.prisma.manutencao.update({
    where: { manutencao_id: BigInt(id) },
    data: {
      ...(veiculoId !== undefined && {
        veiculoId: BigInt(veiculoId),
      }),

      ...(tipoServicoId !== undefined && {
        tipo_servico_id: BigInt(tipoServicoId),
      }),

      ...(manutencaoTipo !== undefined && {
        manutencao_tipo: manutencaoTipo,
      }),

      ...(descricao !== undefined && {
        manutencao_descricao: descricao,
      }),

      ...(quilometragem !== undefined && {
        manutencao_quilometragem: quilometragem,
      }),

      ...(iniciado !== undefined && {
        manutencao_iniciado: new Date(iniciado),
      }),

      ...(valor !== undefined && {
        manutencao_custo_total: valor,
      }),

      ...(status !== undefined && {
        manutencao_status: status,
      }),

      manutencao_atualizado: new Date(),
    },
  });
}

 async remove(id: number) {
  const manutencao = await this.findOne(id);

  const STATUS_CANCELADA = 5;

  if (manutencao.manutencao_status === STATUS_CANCELADA) {
    throw new BadRequestException(
      'Esta manutenção já está cancelada',
    );
  }

  return this.prisma.manutencao.update({
    where: { manutencao_id: BigInt(id) },
    data: {
      manutencao_status: STATUS_CANCELADA,
      manutencao_atualizado: new Date(),
    },
  });
}
}