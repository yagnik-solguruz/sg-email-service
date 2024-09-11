declare module 'sg-email-service' {
    export class EmailService {
      constructor(logger: any);
  
      sendMail(mailOptions: {
        from?: string;
        to: string;
        subject: string;
        text?: string;
        html?: string;
        cc?: string | Array<string>;
        bcc?: string | Array<string>;
        attachments?: Array<{
          filename?: string | false;
          content?: string | Buffer;
          path?: string;
          contentType?: string;
        }>;
      }): Promise<void>;
  
      sendMailToSGAdmin(subject: string, text: string): Promise<void>;
    }
  }
  