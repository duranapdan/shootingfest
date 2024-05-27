import { RecordStatus } from "src/app/complex-types";

export interface SystemParameterDto {
    id: number;
    parameterKey: string;
    parameterValue: string;
    sampleValue: string;
    description: string;
    status: RecordStatus;
}
