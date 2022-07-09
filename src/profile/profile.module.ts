import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from 'src/game-log/game.module';
import { UserModule } from 'src/user/user.module.e2e-spec';
import { ProfileController } from './profile.controller';
import { AchivRepository } from './repository/achiv.repository';
import { RankRepository } from './repository/rank.repository';
import { UserAchivRepository } from './repository/user-achiv.repository';
import { UserProfileRepository } from './repository/user-profile.repository';
import { UserAchivService } from './user-achiv.service';
import { UserGameService } from './user-game.service';
import { UserProfileService } from './user-profile.service';
import { UserRankService } from './user-rank.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserProfileRepository,
      UserAchivRepository,
      AchivRepository,
      RankRepository,
    ]),
    forwardRef(() => GameModule),
    UserModule,
  ],
  controllers: [ProfileController],
  providers: [
    UserProfileService,
    UserAchivService,
    UserGameService,
    UserRankService,
  ],
  exports: [UserProfileService],
})
export class ProfileModule {}
