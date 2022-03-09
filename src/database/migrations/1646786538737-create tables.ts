import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1646786538737 implements MigrationInterface {
    name = 'createTables1646786538737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" character varying NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "user_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "salt" character varying NOT NULL, "key" character varying NOT NULL, "passwordResetToken" character varying, "passwordResetExpires" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "location_id" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_37bfb01591406f0fefaed6799a0" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_37bfb01591406f0fefaed6799a0"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
