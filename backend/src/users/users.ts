import { Injectable } from '@nestjs/common';
import {DataSource} from "typeorm";

@Injectable()
export class Users {}

export const usersProvider = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
        inject: ['DATA_SOURCE'],
    },
];