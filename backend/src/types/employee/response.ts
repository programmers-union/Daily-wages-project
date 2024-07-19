import { ErrorResponse, SuccessResponse } from "client/response";

export interface SuccessResponseEmployee {
    email:Pick<SuccessResponse,'msg'>
};

export interface ErrorResponseEmployee{
    
}