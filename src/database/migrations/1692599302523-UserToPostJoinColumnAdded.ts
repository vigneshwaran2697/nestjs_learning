import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserToPostJoinColumnAdded1692599302523
  implements MigrationInterface
{
  name = 'UserToPostJoinColumnAdded1692599302523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD "user_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "user_id"`);
  }
}
