import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dbConfig from './db.config';

ConfigModule.forRoot({
  isGlobal: true,
});

const datasource = async () => {
  const data = await dbConfig();
  delete data.cli;
  delete data.autoLoadEntities;
  delete data.pool;
  return new DataSource(data);
};

export default datasource();
