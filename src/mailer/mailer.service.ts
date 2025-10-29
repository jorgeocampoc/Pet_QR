import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}
  async sendEmailRegister(email: string, name: string, link: string) {
    await this.mailService.sendMail({
      to: email,
      subject: `Bienvenido a ${process.env.NAME_SYSTEM}`,
      template: './register',
      context: {
        name,
        email,
        link,
      },
    });
  }
}
