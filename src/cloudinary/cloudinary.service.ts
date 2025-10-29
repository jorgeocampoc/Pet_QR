import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY') private cloudinaryClient: typeof cloudinary,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    folder = 'pets',
  ): Promise<string> {
    if (!file) throw new BadRequestException('No file provided');

    return new Promise<string>((resolve, reject) => {
      const uploadStream = this.cloudinaryClient.uploader.upload_stream(
        { folder },
        (error, result: UploadApiResponse) => {
          if (error) {
            reject(new BadRequestException(error.message));
          } else {
            resolve(result.secure_url);
          }
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}
