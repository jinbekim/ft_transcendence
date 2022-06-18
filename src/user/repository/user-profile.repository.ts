import User from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetUserDto } from '../dto/get-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@EntityRepository(User)
export class UserProfileRepository extends Repository<User> {
  async getUser(userSeq: number): Promise<GetUserDto | undefined> {
    const user = await this.findOne(userSeq);
    if (!user) {
      return undefined;
    }
    return ({
      userName: user.nickName,
      userEmail: user.email,
      userStatus: user.status,
      userImage: user.avatarImgUri,
    });
  }

  async checkUser(userSeq: number): Promise<boolean> {
    const user = await this.findOne(userSeq);
    if (!user) {
      return false;
    }
    return true;
  }

  async updateUser(userSeq: number, userData: UpdateUserDto): Promise<GetUserDto> {
    const user = await this.findOne(userSeq);
    user.nickName = userData.nickName;
    user.email = userData.email;
    user.secAuthStatuc = userData.secAuthStatus;
    user.avatarImgUri = userData.avatarImgUri;
    await this.save(user);
    return ({
      userName: user.nickName,
      userEmail: user.email,
      userStatus: user.status,
      userImage: user.avatarImgUri,
    });
  }

  async deleteUser(userSeq: number) {
    const user = await this.findOne(userSeq);
    user.deleteStatus = true;
    await this.save(user);
  }
}