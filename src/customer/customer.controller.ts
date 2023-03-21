import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Render,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import passport from 'passport';
import { Response } from 'express';


@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  // template
  @Get('customerHbs')
  @Render('customer/index')
  async root() {
    console.log('woriking fine');
    return { message: 'this page customer controller' };
  }

  @Get()
  findAll() {
    return this.customerService.findCustomers();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.customerService.findOne(id);
  }

  @Post('signup') signup(@Body() cusotmer: Customer) {
    return this.customerService._signup(cusotmer);
  }

  @Post('login') login(@Body() loginData: string) {
    return this.customerService._login(loginData);
  }

  @Patch(':id')
  async editCustomer(
    @Body() cData: Customer,
    @Param('id') id: number,
  ): Promise<Customer> {
    const upadatedData = await this.customerService.editCustomer(id, cData);
    return upadatedData;
  }

  @Delete(':id')
  delteCustomer(@Param('id', ParseIntPipe) id) {
    return this.customerService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): object {
    return {
      message: 'uploadFile Successfully',
    };
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile1(@UploadedFiles() profiles: Array<Express.Multer.File>) {
    console.log('files', profiles);
    return {
      message: 'uploadFile Successfully',
    };
  }
}
