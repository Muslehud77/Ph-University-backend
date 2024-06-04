export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type THandleError = {
    statusCode : number;
    message : string;
    errorSource : TErrorSource
}