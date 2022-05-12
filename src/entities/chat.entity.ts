import ChatType from 'src/enums/chat-type.enum';
import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import ChatParticipant from './chat-participant.entity';
import Message from './message.entity';

@Entity()
export default class Chat {
  @PrimaryGeneratedColumn()
    chatSeq: number;

  @Column({ nullable: false, default: ChatType.PUBLIC })
    chatType: ChatType;

  @Column({ nullable: false, unique: true })
    chatName: string;

  @Column({ nullable: true })
    password: string;

  @Column({ nullable: false, default: false })
    isDirected: boolean;

  @OneToMany(() => Message, (message) => message.chatSeq)
    msgSeq: number;

  @OneToMany(() => ChatParticipant, (chatParticipant) => chatParticipant.chatSeq)
    partcSeq: ChatParticipant[];
}
