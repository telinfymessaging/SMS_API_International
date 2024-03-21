export interface IComposeResponse {
    SenderData: ISenderDataResponse[]
    groups1_Info: IGroupsInfo[]
    Get_Msgs: IGetMessages[]
    Get_Temps: IGetTempplates[]
}

export interface ISenderDataResponse {
    sender_id: number
    user_id: number
    sender_name: string
    sender_number: any
    inserted_timestamp: string
    isDefault: number
    sender_status: number
    updated_timestamp: string
}

export interface IGroupsInfo {
    g_id: number
    g_name: string
    uid: number
    inserted_timestamp: string
}

export interface IGetMessages {
    uname: string
    mid: number
    mname: string
    msg: string
    recv_timestamp: string
}

export interface IGetTempplates {
    tid: number
    user_id: number
    template: string
    hex_template: string
    template_id: string
    tstatus: number
    Template_name: string
    isUnicode: number
    recive_timestamp: string
    no_of_spaces: number
    headers: string
}
