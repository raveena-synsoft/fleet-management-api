import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]),
MulterModule.register({
    dest: './uploads',
   
})],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
