import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!file?.buffer) {
      throw new InternalServerErrorException('Invalid file upload');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'profile_pics' },
        (error, result) => {
          if (error) {
            reject(
              new InternalServerErrorException(
                `Upload failed: ${error.message}`,
              ),
            );
          } else if (!result) {
            reject(new InternalServerErrorException('Empty upload response'));
          } else {
            resolve(result);
          }
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      uploadStream.end(file.buffer);
    });
  }
}
