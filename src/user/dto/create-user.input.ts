import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInputs {
  @Field()
  fullname: string;
}
