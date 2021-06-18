import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller()
export class UploadController {
    constructor(private readonly configService: ConfigService) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename(_, file, callback) {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return callback(
                        null,
                        `${randomName}${extname(file.originalname)}`,
                    );
                },
            }),
        }),
    )
    uploadFile(@UploadedFile() file) {
        console.log(file);
        return {
            url: `${this.configService.get('UPLOAD_URL')}/${file.filename}`,
        };
    }

    @Get('uploads/:path')
    async getImage(@Param('path') path, @Res() res: Response) {
        res.sendFile(path, { root: 'uploads' });
    }
}
