import { ColumnType } from "typeorm";

export class AppConstants {
    static TIME_WITH_ZONE_TYPE: ColumnType = 'timestamp with time zone';
    static CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP(6)';

}