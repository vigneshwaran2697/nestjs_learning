import { Body, Controller, Header, Post, Req, Res } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactInputs } from './dto/contact.inputs';
import { Response } from 'express';

@Controller('')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/identify')
  @Header('Content-Type', 'application/json')
  async upsertContact(@Body() contactInput: ContactInputs, @Res() response: Response){
    return this.contactService.upsertContact(contactInput, response);
  }
}
