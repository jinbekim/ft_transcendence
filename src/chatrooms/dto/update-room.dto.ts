import { ApiProperty } from '@nestjs/swagger';
import ChatType from 'src/enums/mastercode/chat-type.enum';

export class UpdateRoomDto {
  @ApiProperty({
    description: '채팅방 ID',
  })
    chatSeq: number;

  @ApiProperty({
    description: '채팅방 이름',
    example: '푸주홍의 등산크럽',
  })
    chatName: string;

  @ApiProperty({
    description: '채팅방 종류 (마스터코드)',
    type: ChatType,
    enum: ['CHTP20', 'CHTP30'],
  })
    chatType: ChatType;

  @ApiProperty({
    description: '채팅방 비밀번호',
    example: 'pass1234',
  })
    password: string;
}