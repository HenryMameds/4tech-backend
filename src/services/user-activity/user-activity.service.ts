import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/repository/user-repository';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comment.dto';
import { UserActivityRepository } from 'src/repositories/user-activity-repository/user-activity-repository';

@Injectable()
export class UserActivityService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userActivityRepository: UserActivityRepository){
  }
  async getRecentUploads(index: string){

    const indexAsNumber = parseInt(index, 10);
    if(isNaN(indexAsNumber)) {
      throw new BadRequestException('Invalid Index')
    }

    return await this.userActivityRepository.getPaged(indexAsNumber)
  }

  async uploadImage(userId: string, filename: string, description: string){

   const user = await this.userRepository.getById(userId);
    if(!user){
      throw new BadRequestException('This user does not exist');
    }

    const uploadImageObj = new UserActivityDto(userId, filename, user.userName);
    if (description) {
      uploadImageObj.comments.push(new UserActivityCommentDto(
        userId,
        user.userName,
        description,
      ));
    }

    return await this.userActivityRepository.create(uploadImageObj)
  }
}
