import { DataSource } from 'typeorm';

import { UserDetail } from '../entities/userDetail.entity';

export const userDetailRepository = [
  {
    provide: 'USER_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserDetail),
    inject: ['DATA_SOURCE'],
  },
];
