import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/createUser.dto';
import { UpdateUserInput } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  private logger: Logger;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.logger = new Logger('UserService');
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      return this.userRepository.create(createUserInput);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    try {
      await this.userRepository.save(updateUserInput);
      return this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      await this.userRepository.findOneByOrFail({ id });
      return await this.userRepository.softRemove({ id });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
