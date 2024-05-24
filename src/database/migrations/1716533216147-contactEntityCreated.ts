import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactEntityCreated1716533216147 implements MigrationInterface {
    name = 'ContactEntityCreated1716533216147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."contact_c_link_precedence_enum" AS ENUM('primary', 'secondary')`);
        await queryRunner.query(`CREATE TABLE "contact" ("c_id" SERIAL NOT NULL, "c_phone_number" character varying NOT NULL, "c_email" character varying NOT NULL, "c_linked_id" integer NOT NULL, "c_link_precedence" "public"."contact_c_link_precedence_enum" NOT NULL DEFAULT 'primary', "c_created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "c_updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "c_deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "phone_email_unique" UNIQUE ("c_email", "c_phone_number"), CONSTRAINT "PK_45649a1656a44004c5a2511f957" PRIMARY KEY ("c_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TYPE "public"."contact_c_link_precedence_enum"`);
    }

}
