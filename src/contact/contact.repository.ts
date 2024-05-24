import { BaseRepository } from "src/database/base.respoitory";
import { Contact } from "./entities/contact.entity";
import { DataSource } from "typeorm";

export class ClassRepository extends BaseRepository<Contact> {
    constructor(private readonly datasource: DataSource) {
        super(Contact, datasource.createEntityManager() )
    }
}