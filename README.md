# SG Email Service

A simple email service using the `sg-email-sender` package with logging capabilities. This package helps you send emails using SMTP with easy configuration and logging features.

## Installation

To use the `sg-email-service` package, install it via npm:

```bash
npm install sg-email-service winston
```

## Usage

Here’s how to use the `EmailService` class to send emails with logging:

### Example Code

```typescript
import { EmailService } from "sg-email-service";
import * as winston from "winston";

// Set up your logger (using winston in this example)
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `logs/logfile-${new Date().toISOString().slice(0, 10)}.log`,
    }),
  ],
});

// Initialize EmailService with logger
const emailService = new EmailService(logger);

// Send an email
emailService
  .sendMail({
    to: "recipient@example.com",
    subject: "Test Email",
    text: "This is a test email.",
  })
  .then((response) => {
    console.log("Email sent successfully:", response);
  })
  .catch((error) => {
    console.error("Error sending email:", error);
  });
```

## Configuration

Set up environment variables to configure the SMTP service:

### Environment Variables

Create a `.env` file or export the following variables in your environment:

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

### Explanation

- `PROJECT`: Name of your project.
- `SMTP_SERVICE`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_FROM`, `SMTP_USER`, `SMTP_PASS`: Configuration for the SMTP server.
- `SG_SMTP_SERVICE`, `SG_SMTP_HOST`, `SG_SMTP_PORT`, `SG_SMTP_FROM`, `SG_SMTP_USER`, `SG_SMTP_PASS`: Alternative SMTP configuration .

## Logging

The example uses `winston` for logging. The logs are written to both the console and a file with a date-based filename. You can adjust the logging configuration according to your needs.
