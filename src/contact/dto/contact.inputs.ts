import { IsEmail, IsOptional } from 'class-validator';


export class ContactInputs {
    @IsEmail()
    @IsOptional()
    email: string;
    phoneNumber: string;
}