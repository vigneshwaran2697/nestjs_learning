import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactInputs } from './dto/contact.inputs';
import { Response } from 'express';

@Controller('')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/identify')
  async upsertContact(@Body() contactInput: ContactInputs, @Res() response: Response){
    return this.contactService.upsertContact(contactInput, response);
  }
}
