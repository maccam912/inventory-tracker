export interface Lot {
    id: number;
    lotNumber: string;
    expirationDate: string;
    created_at: Date;
    updated_at: Date;
}

export interface Site {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface Inventory {
    lotId: number;
    siteId: number;
    units: number;
    created_at: Date;
    updated_at: Date;
}