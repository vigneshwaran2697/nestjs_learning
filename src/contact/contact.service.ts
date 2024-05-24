import { Injectable } from '@nestjs/common';
import { ContactInputs } from './dto/contact.inputs';
import { Response } from 'express';

@Injectable()
export class ContactService {
    async upsertContact(contactInputs: ContactInputs, response: Response) {
        console.log(contactInputs);
        
        return response.sendStatus(200);
    }
}
