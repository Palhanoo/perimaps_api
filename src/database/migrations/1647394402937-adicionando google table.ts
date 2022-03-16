import {MigrationInterface, QueryRunner} from "typeorm";

export class adicionandoGoogleTable1647394402937 implements MigrationInterface {
    name = 'adicionandoGoogleTable1647394402937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "googleUser" ("id" character varying NOT NULL, "google_id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "userPic" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "location_id" character varying, CONSTRAINT "PK_f493c285922cd4af07444346ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "googleUser" ADD CONSTRAINT "FK_9254bfbf69e4386524395083c0d" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "googleUser" DROP CONSTRAINT "FK_9254bfbf69e4386524395083c0d"`);
        await queryRunner.query(`DROP TABLE "googleUser"`);
    }

}
