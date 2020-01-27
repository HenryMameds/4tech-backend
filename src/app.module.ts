import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import {UserService } from './services/user/user.service';
import { UserActivityService } from './services/user-activity/user-activity.service';
import { UserRepository } from './repositories/repository/user-repository';
import { UserActivityRepository } from './repositories/user-activity-repository/user-activity-repository';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { secretKey, JwtStrategy } from './services/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from  '@nestjs/mongoose'
import { UserSchema } from './domain/schemas/user.schema'
import { UserActivitySchema } from './domain/schemas/user-activity.schema'
import { UserActivityController } from './controllers/user-activity/user-activity.controller';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Module({
  imports: [
    // MongooseModule.forRoot("mongodb://henrymameds:HMS%402019xiaomi@localhost:27017/admin",
    MongooseModule.forRoot("mongodb://localhost:27017/admin?authSource=admin",
    {
      user: 'henrymameds',
      pass: 'HMS@2019xiaomi',
      userNewUrlParse: true,
      userUnifiedTopology: true,
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      {name: 'UserActivity', schema: UserActivitySchema}
    ]),
    JwtModule.register(
      {
        secret: secretKey, signOptions: {
          expiresIn: '600m',
        },
      }),
  ],
  controllers: [AppController, UserController, AuthController, UserActivityController],
  providers: [AppService, UserService, AuthService, UserRepository, UserActivityRepository, JwtStrategy, UserActivityService, WebsocketGateway],
})
export class AppModule {}
