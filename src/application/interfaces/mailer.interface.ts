import { JsonObject } from "@/core/types";

export interface ISendMailOptions {
  to: string | string[];
  subject: string;
  template?: string; // Name of the handlebars template file (without extension)
  context?: JsonObject; // Context variables for the template
  text?: string; // Fallback plain text
  html?: string; // Raw HTML (if not using a template)
  from?: string; // Optional sender name/email override
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content?: any;
    path?: string;
    contentType?: string;
  }>;
}

export interface IMailerService {
  sendMail(options: ISendMailOptions): Promise<void>;
}

export const MAILER_SERVICE = Symbol('IMailerService');
