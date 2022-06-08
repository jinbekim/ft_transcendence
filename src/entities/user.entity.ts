import {
  Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import UserStatus from 'src/enums/mastercode/user-status.enum';
import Alarm from './alarm.entity';
import ChatParticipant from './chat-participant.entity';
import Friends from './friends.entity';
import GameLog from './game-log.entity';
import { Game } from './game.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
    userSeq: number; // 유저 시퀀스

  @Column({ unique: true })
    userId: number; // 42 ID

  @Column({ unique: true })
    nickName: string; // 닉네임

  @Column({ unique: true })
    email: string; // 이메일

  @Column({ default: false })
    secAuthStatuc: boolean; // 이차인증 여부

  @Column({ default: 'defaultavatar.jpeg' })
    avatarImgUri: string; // 프로필 이미지 URI

  @Column({ default: UserStatus.USST10 })
    status: UserStatus; // 접속 여부

  @Column({ default: false })
    deleteStatus: boolean; // 삭제 여부

  @CreateDateColumn()
    createdAt: Date; // 생성일

  @OneToMany(() => Alarm, (alarm) => alarm.receiverSeq)
    receiver: Alarm[];

  @OneToMany(() => Alarm, (alarm) => alarm.senderSeq)
    sender: Alarm[];

  @OneToMany(() => Friends, (friends) => friends.followeeSeq)
    followee: Friends[];

  @OneToMany(() => Friends, (friends) => friends.followerSeq)
    follower: Friends[];

  @OneToMany(() => ChatParticipant, (chatParticipant) => chatParticipant.userSeq)
    partcSeq: ChatParticipant[];

  @OneToMany(() => GameLog, (gameLog) => gameLog.winnerSeq)
    winner: GameLog[];

  @OneToMany(() => Game, (game) => game.topUserSeq)
    topUser: Game[];

  @OneToMany(() => Game, (game) => game.btmUserSeq)
    btmUser: Game[];
}
