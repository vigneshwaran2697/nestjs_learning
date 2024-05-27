import { HttpStatus, Injectable } from '@nestjs/common';
import { ContactInputs } from './dto/contact.inputs';
import { Response } from 'express';
import { ContactRepository } from './contact.repository';
import { LinkPrecedence } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepo: ContactRepository) {}

  async getContactByEmailorPhone(phoneNumber: string, email: string) {
    const contactQuery = await this.contactRepo
      .createQueryBuilder('contact')
      .select('contact');

    if (phoneNumber && email) {
      contactQuery.where(
        'contact.phoneNumber =:phone or contact.email =:email',
        {
          phone: phoneNumber,
          email: email,
        },
      );
    } else if (phoneNumber && !email) {
      contactQuery.where('contact.phoneNumber =:phone', {
        phone: phoneNumber,
      });
    } else {
      contactQuery.where('contact.email =:email', {
        email: email,
      });
    }

    return contactQuery.getMany();
  }

  async upsertContact(contactInputs: ContactInputs, response: Response) {
    const existingContact = await this.getContactByEmailorPhone(
      contactInputs.phoneNumber,
      contactInputs.email,
    );

    if (!existingContact.length) {
      await this.contactRepo.save({
        phoneNumber: contactInputs.phoneNumber,
        email: contactInputs.email,
      });
    }
    // To link two different record.
    else if (existingContact?.length > 1) {
      if (
        existingContact[0].phoneNumber !== existingContact[1].phoneNumber &&
        existingContact[0].email !== existingContact[1].email
      ) {
        await this.contactRepo.update(
          {
            id: existingContact[1].id,
          },
          {
            linkPrecedence: LinkPrecedence.SECONDARY,
            linkedId: existingContact[0].id,
          },
        );
      }
    } else {
      if (
        existingContact[0]?.email === contactInputs?.email &&
        existingContact[0]?.phoneNumber === contactInputs?.phoneNumber
      ) {
      } else if (contactInputs?.email !== null && contactInputs?.phoneNumber !== null &&
        existingContact[0]?.email === contactInputs?.email &&
        existingContact[0]?.phoneNumber !== contactInputs?.phoneNumber
      ) {
        await this.contactRepo.save({
          phoneNumber: contactInputs.phoneNumber,
          email: contactInputs.email,
          linkPrecedence: LinkPrecedence.SECONDARY,
          linkedId: existingContact[0].id,
        });
      } else if (contactInputs?.email !== null && contactInputs?.phoneNumber !== null &&
        existingContact[0]?.email !== contactInputs?.email &&
        existingContact[0]?.phoneNumber === contactInputs?.phoneNumber
      ) {
        await this.contactRepo.save({
          phoneNumber: contactInputs.phoneNumber,
          email: contactInputs.email,
          linkPrecedence: LinkPrecedence.SECONDARY,
          linkedId: existingContact[0].id,
        });
      }
    }

    const contacts = await this.getContactByEmailorPhone(
        contactInputs.phoneNumber,
        contactInputs.email,
      );

    let result = {
      contact: {
        primaryContactId: null,
        emails: [],
        phoneNumbers: [],
        secondaryContactIds: [],
      },
    };

    contacts.forEach((contact) => {
      if (
        !result.contact.primaryContactId &&
        contact.linkPrecedence === 'primary'
      ) {
        result.contact.primaryContactId = contact.id;
      }

      if (contact.email) {
        result.contact.emails.push(contact.email);
      }

      if (contact.phoneNumber) {
        result.contact.phoneNumbers.push(contact.phoneNumber);
      }

      if (contact.linkedId !== null && contact.linkPrecedence === 'secondary') {
        result.contact.secondaryContactIds.push(contact.id);
      }
    });
    result.contact.phoneNumbers = [...new Set(result.contact.phoneNumbers)];

    return response.status(HttpStatus.OK).json(result);
  }
}
