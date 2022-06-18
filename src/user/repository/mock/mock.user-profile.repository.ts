import UserStatus from 'src/enums/mastercode/user-status.enum';
import { GetUserDto } from 'src/user/dto/get-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

export default class MockUserProfileRepository {
  MockEntity: any[] = [];

  constructor() {
    this.MockEntity.push({
      userSeq: 1,
      userId: 10,
      nickName: 'skim',
      email: 'skim@student.42seoul.kr',
      sedAuthStatus: false,
      avatarImgUri: './img/defaultProfile.jpg',
      status: UserStatus.USST10,
      deleteStatus: false,
      createdAt: new Date(),
    });
    this.MockEntity.push({
      userSeq: 2,
      userId: 20,
      nickName: 'kkim',
      email: 'kkim@student.42seoul.kr',
      sedAuthStatus: false,
      avatarImgUri: './img/defaultProfile.jpg',
      status: UserStatus.USST10,
      deleteStatus: false,
      createdAt: new Date(),
    });
  }

  async getUser(userSeq: number): Promise<GetUserDto | undefined> {
    const user = await this.MockEntity.find((u) => u.userSeq === userSeq);
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
    const user = await this.MockEntity.find((u) => u.userSeq === userSeq);
    if (!user) {
      return false;
    }

    return true;
  }

  async updateUser(userSeq: number, userData: UpdateUserDto): Promise<UpdateUserDto> {
    const userIdx = await this.MockEntity.findIndex((u) => u.userSeq === userSeq);
    this.MockEntity[userIdx].nickName = userData.nickName;
    this.MockEntity[userIdx].email = userData.email;
    this.MockEntity[userIdx].secAuthStatus = userData.secAuthStatus;
    this.MockEntity[userIdx].avatarImgUri = userData.avatarImgUri;

    return ({
      nickName: this.MockEntity[userIdx].nickName,
      email: this.MockEntity[userIdx].email,
      secAuthStatus: this.MockEntity[userIdx].secAuthStatus,
      avatarImgUri: this.MockEntity[userIdx].avatarImgUri,
    });
  }

  async deleteUser(userSeq: number) {
    const userIdx = await this.MockEntity.findIndex((u) => u.userSeq === userSeq);
    this.MockEntity.splice(userIdx, userIdx + 1);
  }
}
