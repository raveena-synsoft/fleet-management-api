import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // async createCustomer(customer1: Customer) {
  //   let customer = new Customer()
  //   customer.name = customer1.name;
  //   customer.email = customer1.email;
  //   customer.city = customer1.city;
  //   customer.age = customer1.age;
  //   return  this.customerRepository.save(customer);

  //   }

  async _signup(cData: Customer) {
    let email = cData.email;

    const findCustomer = await this.customerRepository.findOne({ email });
    if (findCustomer) {
      throw new NotAcceptableException('customer already exists');
    } else {
      //
      let customer = new Customer();

      const password = cData.password;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      customer.firstName = cData.firstName;
      customer.lastName = cData.lastName;
      customer.email = cData.email;
      customer.password = hashPassword;
      customer.phone = cData.phone;
      customer.comapanyName = cData.comapanyName ? cData.comapanyName : '';
      customer.numberOfVehicle = cData.numberOfVehicle
        ? cData.numberOfVehicle
        : 0;
      customer.agencyLoaction = cData.agencyLoaction
        ? cData.agencyLoaction
        : '';
        // Bank Name
        // - Bank Account No. 
        // - Bank Code
        // - Branch Name
        let customerSave = await this.customerRepository.save(customer);
        console.log("customerSavecustomerSave",customerSave);  
      return customerSave
    }
  }

  // findAll():Promise<User[]> {

  async _login(customer: any): Promise<Customer> {
    // let email1  = email.email

    // console.log("cData: ", email1);
    let { email, password } = customer;
    console.log('passpasspasspass: ', email, password);

    // let email = cData.email;
    const findCustomer = await this.customerRepository.findOne({ email });
    if (!findCustomer) {
      throw new NotAcceptableException('No customer found');
    } else {
      const isPasswordMatching = await bcrypt.compare(
        password,
        findCustomer.password,
      );
      if (isPasswordMatching) return findCustomer;
      else throw new NotAcceptableException('check your password');
    }
  }


  async findCustomers(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  findOne(id: string): Promise<Customer> {
    return this.customerRepository.findOne(id);
  }

  async remove(id: string): Promise<any> {
    return this.customerRepository.delete(id);
  }

  async editCustomer(id: number, cusotmerData: Customer): Promise<Customer> {
    const editCustomerData = await this.customerRepository.findOne(id);
    if (!editCustomerData) {
      throw new NotFoundException('No customer found');
    }
    // editCustomerData.name = cusotmerData.name;
    // editCustomerData.city = cusotmerData.city;
    // editCustomerData.age = cusotmerData.age;
    // editCustomerData.email = cusotmerData.email;
    await editCustomerData.save();
    return editCustomerData;
  }
}
