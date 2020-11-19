export interface resMessage<T>{
    code: number | undefined,
    data: T | undefined,
    message: string | undefined
}