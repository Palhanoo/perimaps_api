import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableUser1646786892217 implements MigrationInterface {
    name = 'alterTableUser1646786892217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_37bfb01591406f0fefaed6799a0"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "location_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_37bfb01591406f0fefaed6799a0" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_37bfb01591406f0fefaed6799a0"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "location_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_37bfb01591406f0fefaed6799a0" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
