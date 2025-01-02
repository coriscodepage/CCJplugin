export interface Player {
    collection: 'profile',
    name: string;
    pdata: object;
    gachaitem: string;
};

export interface PlayerResponse {
    pdata: object;
    gachaitem: KITEM<"str">;
}
