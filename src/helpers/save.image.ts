import { BadRequestException } from '@nestjs/common';
import * as path from 'path';
import { validFormatImg } from 'src/utils.ts/data';
import { promises as fs } from 'fs';
export const saveImage = async (
  file: Express.Multer.File,
  idPet: string,
  folder = 'qr',
) => {
  if (!file) {
    throw new BadRequestException('No file uploaded');
  }
  const ext: any = file.originalname.split('.').pop();
  if (!validFormatImg.includes(ext)) {
    throw new BadRequestException(
      'Invalid image format. Only JPG, PNG or JPEG allowed',
    );
  }
  const fileName = idPet + '.' + ext;
  const uploadFile = path.join(process.cwd(), 'uploads', folder);
  await fs.mkdir(uploadFile, { recursive: true });
  const filePath = path.join(uploadFile, fileName);
  await fs.writeFile(filePath, file.buffer);
  return `uploads/${folder}/${fileName}`;
};
