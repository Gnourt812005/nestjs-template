import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_FILE_TYPES = /(jpg|jpeg|png|gif|pdf|docx|doc|txt)$/;

@Injectable()
export class FileUploadValidationPipe extends ParseFilePipe {
  constructor() {
    super({
      validators: [
        new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
        new FileTypeValidator({ fileType: ALLOWED_FILE_TYPES }),
      ],
      // Use errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY if preferred
    });
  }
}
