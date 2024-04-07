import { DataSource, Repository } from 'typeorm';
import { newDb, DataType } from 'pg-mem';
import { v4 } from 'uuid';
import { User } from '../src/users/entities/user.entity';
import { Skill } from '../src/skills/entities/skill.entity';
import { Project } from '../src/projects/entities/project.entity';
import { userCody, userEric, userJose } from './users';

// If wanting to use a testing DB, follow: https://stackoverflow.com/questions/55366037/inject-typeorm-repository-into-nestjs-service-for-mock-data-testing/66298268#66298268

// Source: https://gist.github.com/navjotahuja92/f51601b17fb248cf4727b5650d945607
// Repo: https://github.com/vvtri/nestjs-typeorm-pg_mem-e2e_test
const setupDataSource = async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });

  db.public.registerFunction({
    name: 'obj_description',
    args: [DataType.text, DataType.text],
    returns: DataType.text,
    implementation: () => 'test',
  });

  db.public.registerFunction({
    name: 'version',
    implementation: () =>
      'PostgreSQL 14.2, compiled by Visual C++ build 1914, 64-bit',
  });

  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });

  const ds: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [User, Skill, Project],
  });
  await ds.initialize();
  await ds.synchronize();

  // TODO: USE MIGRATIONS INSTEAD MANUAL PUSHING DATA
  const userRepo: Repository<User> = ds.getRepository(User);
  await userRepo.insert(userCody);
  await userRepo.insert(userJose);
  await userRepo.insert(userEric);

  return ds;
};

export default setupDataSource;
