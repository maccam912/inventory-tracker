export interface Lot {
    id: number;
    lotNumber: string;
    expirationDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Site {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Inventory {
    lotId: number;
    siteId: number;
    units: number;
    createdAt: Date;
    updatedAt: Date;
}