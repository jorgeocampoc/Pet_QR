import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/common/utils/hash.util';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { emailNoAvailable, errorProcessing } from 'src/common/messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, email } = createUserDto;
      const user = await this.findOneByEmail(email);
      if (user) {
        throw new BadRequestException(emailNoAvailable);
      }
      const hashPass = await hashPassword(password);
      createUserDto.password = hashPass;
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        errorProcessing,
      );
    }
  }
  async register(createUserDto: RegisterDto): Promise<User> {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        errorProcessing,
      );
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        errorProcessing,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  removeByEmail(email: string) {
    return this.userRepository.delete({ email });
  }
  verifyEmail(email: string) {
    return this.userRepository.update({ email }, { verifyEmail: true });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
