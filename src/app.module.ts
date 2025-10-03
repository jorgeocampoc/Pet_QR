import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
