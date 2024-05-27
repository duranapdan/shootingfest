import { IResult } from "./api-result.model";

export interface IDataResult<T> extends IResult {
    data: T;
}