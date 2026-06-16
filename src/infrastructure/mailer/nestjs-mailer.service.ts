import { Injectable, Inject } from '@nestjs/common';
import { MailerService as NestMailService } from '@nestjs-modules/mailer';
import type { IMailerService, ISendMailOptions, ILoggerService } from '@/application/interfaces';
import { LOGGER_SERVICE } from '@/application/interfaces';
import { errorMessage, toError } from '@/shared/utils';

@Injectable()
export class NestjsMailerService implements IMailerService {
  constructor(
    private readonly mailerService: NestMailService,
    @Inject(LOGGER_SERVICE)
    private readonly logger: ILoggerService,
  ) {
    this.logger.setContext(NestjsMailerService.name);
  }

  async sendMail(options: ISendMailOptions): Promise<void> {
    try {
      this.logger.log(`Sending email to ${options.to} with subject "${options.subject}"...`);
      
      const mailOptions: ISendMailOptions = {
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        from: options.from,
        cc: options.cc,
        bcc: options.bcc,
        attachments: options.attachments,
      };

      // Set template if provided
      if (options.template) {
        mailOptions.template = options.template;
        mailOptions.context = options.context || {};
      }

      await this.mailerService.sendMail(mailOptions);
      this.logger.log(`✓ Email sent successfully to ${options.to}`);
    } catch (error) {
      const { message, stack } = toError(error);
      this.logger.error(`Failed to send email to ${options.to}: ${message}`, stack);
      throw error;
    }
  }
}
