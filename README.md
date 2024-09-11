
# SG Email Service



```bash
import { EmailService } from 'sg-email-sender';
import * as winston from 'winston';

// Set up your logger (using winston in this example)
const logger = createLogger({
  level: 'info',
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `logs/logfile-${new Date().toLocaleDateString('es-CL')}.log`,
    }),
  ],
});

// Initialize EmailService with logger
const emailService = new EmailService(logger);

// Send an email
emailService.sendMail({
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'This is a test email.',
});

```
    
## ENV
```bash
PROJECT=YourProjectName

SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_FROM=email@gmail.com
SMTP_USER=email@gmail.com
SMTP_PASS=password

SG_SMTP_SERVICE=gmail
SG_SMTP_HOST=smtp.gmail.com
SG_SMTP_PORT=465
SG_SMTP_FROM=email2@gmail.com
SG_SMTP_USER=email2@gmail.com
SG_SMTP_PASS=password2

```
    