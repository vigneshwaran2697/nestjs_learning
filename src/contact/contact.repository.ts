import { BaseRepository } from "src/database/base.respoitory";
import { Contact } from "./entities/contact.entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ContactRepository extends BaseRepository<Contact> {
    constructor(private readonly datasource: DataSource) {
        super(Contact, datasource.createEntityManager() )
    }
}