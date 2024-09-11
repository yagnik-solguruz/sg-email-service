import { createTransport, Transporter } from "nodemailer";
import * as fs from "fs";
import * as path from "path";

interface MailOptions {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  cc?: string | Array<string>;
  bcc?: string | Array<string>;
  attachments?: {
    filename?: string | false | undefined;
    content?: string | Buffer | undefined;
    path?: string | undefined;
    folder?: string;
    contentType?: string | undefined;
  }[];
}

export class EmailService {
  private transporter: Transporter;
  private logger: any;

  constructor(logger: any) {
    // Create the main transporter using environment variables
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!, 10),
      // secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    this.logger = logger;
  }

  // Method to send mail using the SG transporter
  async sendMailToSGAdmin(subject: string, text: string) {
    const mailOptions: MailOptions = {
      from: `Server <${process.env.SG_SMTP_FROM}>`,
      to: process.env.SG_ADMIN_INBOX!,
      subject,
      text: [
        `Environment: ${process.env.NODE_ENV}`,
        `Project: ${process.env.PROJECT}`,
        text,
        "Please fix this issue in your code.",
      ].join("\n"),
    };

    try {
      // Create a separate transporter for SG Admin using different SMTP configuration
      const sgTransporter = createTransport({
        service: process.env.SG_SMTP_SERVICE,
        host: process.env.SG_SMTP_HOST,
        port: parseInt(process.env.SG_SMTP_PORT!, 10),
        requireTLS: true,
        auth: {
          user: process.env.SG_SMTP_USER,
          pass: process.env.SG_SMTP_PASS,
        },
      });
      await sgTransporter.sendMail(mailOptions);
    } catch (error: Error | any) {
      this.logger.error(
        `${new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })} - SG Mail - ${error.message}`
      );
    }
  }

  // Main method to send mail
  async sendMail(mailOptions: MailOptions) {
    if (!mailOptions.from) {
      mailOptions.from = `${process.env.PROJECT} <${process.env.SMTP_FROM}>`;
    }

    try {
      await this.transporter.sendMail(mailOptions);

      if (mailOptions.attachments && mailOptions.attachments.length > 0) {
        mailOptions.attachments.forEach((element) => {
          if (element.folder === "report") {
            fs.unlinkSync(
              path.join("public", "report", path.basename(element.path!))
            );
          } else {
            this.logger.error(
              `Warning: Unable to determine the folder for file '${element.filename}' with path '${element.path}'.`
            );
          }
        });
      }
    } catch (error: Error | any) {
      this.logger.error(error.message);
      await this.sendMailToSGAdmin(
        "Error Occurred while sending mail",
        error.message
      );
    }
  }
}
