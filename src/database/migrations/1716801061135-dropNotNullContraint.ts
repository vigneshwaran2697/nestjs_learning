import { MigrationInterface, QueryRunner } from "typeorm"

export class DropNotNullContraint1716801061135 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE contact DROP CONSTRAINT "phone_email_unique"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE contact ADD CONSTRAINT "phone_email_unique" UNIQUE ("c_email", "c_phone_number")`);
    }

}
