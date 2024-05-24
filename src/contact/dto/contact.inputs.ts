import { IsEmail } from 'class-validator';

export class ContactInputs {
    @IsEmail()
    email: string;
    phoneNumber: string;
}