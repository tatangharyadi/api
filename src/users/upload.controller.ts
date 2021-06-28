import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { saveImage } from 'src/common/image.storage';
import { join } from 'path';

@Controller()
export class UploadController {
    constructor(private readonly configService: ConfigService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', saveImage))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        const fileName = file?.filename;

        if (!fileName)
            throw new BadRequestException('Valid file is png, jpg, jpeg');

        const imagePath = join(process.cwd(), 'uploads/') + file.filename;

        return {
            url: `${this.configService.get('UPLOAD_URL')}/${file.filename}`,
        };
    }

    @Get('uploads/:path')
    async getImage(@Param('path') path, @Res() res: Response) {
        res.sendFile(path, { root: 'uploads' });
    }
}
