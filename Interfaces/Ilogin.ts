export interface ILogin {
    uname: string
    pwd: string
}
export interface ILoginResponce {
    status: number,
    data: {
        message: string
        UID: number
        UNAME: string
        token: string
    },
    error: string
}
