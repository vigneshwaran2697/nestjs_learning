import { AppConstants } from 'src/utils/app-constants';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum LinkPrecedence {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

@Entity({ name: 'contact' })
// @Unique('phone_email_unique', ['email', 'phoneNumber'])
export class Contact {
  @PrimaryGeneratedColumn('increment', { name: 'c_id' })
  id: number;

  @Column({ name: 'c_phone_number', nullable: false })
  phoneNumber: string;

  @Column({ name: 'c_email', nullable: false })
  email: string;

  @Column({ name: 'c_linked_id', type: 'int', nullable: true})
  linkedId: number;

  @Column({
    name: 'c_link_precedence',
    type: 'enum',
    enum: LinkPrecedence,
    default: LinkPrecedence.PRIMARY,
  })
  linkPrecedence: LinkPrecedence;

  @CreateDateColumn({
    type: AppConstants.TIME_WITH_ZONE_TYPE,
    default: () => AppConstants.CURRENT_TIMESTAMP,
    name: 'c_created_at',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: AppConstants.TIME_WITH_ZONE_TYPE,
    default: () => AppConstants.CURRENT_TIMESTAMP,
    onUpdate: AppConstants.CURRENT_TIMESTAMP,
    name: 'c_updated_at',
  })
  public updatedAt?: Date;

  @DeleteDateColumn({
    name: 'c_deleted_at',
    type: AppConstants.TIME_WITH_ZONE_TYPE,
  })
  public deletedAt?: Date;
}
