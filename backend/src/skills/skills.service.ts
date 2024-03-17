import { Injectable, Logger } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  private readonly logger: Logger = new Logger(SkillsService.name);

  constructor(
    @InjectRepository(Skill)
    private skills: Repository<Skill>,
  ) {}
  async create(createSkillDto: CreateSkillDto) {
    await this.skills.insert(createSkillDto);
    return await this.skills.findOne({
      where: {
        name: createSkillDto.name,
      },
    });
  }

  async findAll() {
    return await this.skills.find();
  }

  async findOne(id: string) {
    return await this.skills.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    return await this.skills.update(id, updateSkillDto);
  }

  async remove(id: string) {
    return await this.skills.remove(
      await this.skills.findOne({ where: { id } }),
    );
  }
}
