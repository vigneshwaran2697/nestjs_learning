import { MigrationInterface, QueryRunner } from "typeorm";

export class AllowNullContraintAdded1716691514229 implements MigrationInterface {
    name = 'AllowNullContraintAdded1716691514229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" ALTER COLUMN "c_linked_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" ALTER COLUMN "c_linked_id" SET NOT NULL`);
    }

}
