import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async find(id: number) {
    if (!id) return null;
    const user = await User.findOne({ id });
    return user;
  }

  findByUsername(username: string) {
    return User.findOne({ username });
  }

  findAll() {
    return User.find();
  }

  async create(new_user: CreateUserDto) {
    const { username, password } = new_user;
    const user = await this.findByUsername(username);
    if (user) {
      throw new BadRequestException('Username already exist');
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      password: hash,
    });

    return User.save(newUser);
  }

  async update(id: number, newUser: Partial<User>) {
    const user = await User.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (newUser.password) {
      newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    Object.assign(user, newUser);
    return User.save(user);
  }

  async delete(id: number) {
    if (!id) return null;
    return User.delete({ id });
  }
}
