export interface IProduct {
    id: string;
    name: string;
    type: ProductType;
    image: string;
    banner: string;
    gallery: IGalleryItem[];
    technicalFeatures?: ITechnicalFeatures[];
    isCompared: boolean;

    // Accept/Verify
    acceptVerify: boolean;
    acceptBundle?: boolean;
    nbAccept?: number;
    
    // Redistribution
    redistributeAll: boolean;
    nbRedistribute?: number;
    typeOfTicket?: string;
    redistributeBundle?: boolean;
    nbRedistributeBundle?: number;

    // Recycler
    recycler?: boolean;
    nbRecycler: number;
    nbTicket: number;
    nbTicket2: number;

    // Detect fake money
    fakeMoney?: boolean;

    // Distributor
    nbDistributor?: number;

    // Shielding
    shieldingMM: number;
    transponder?: boolean;

    // Monitor/Laptop + Screen
    monitor?: boolean;
    laptop?: boolean;
    inche?: number;
    screen?: boolean;
    screenInche?: number;
    screenTactical?: boolean;
    screenTacticalInche?: number;

    // Calculator
    calculator?: boolean;

    // Smartphone APP
    application?: boolean;

    // OS
    os: boolean;

    // Dimensions
    twiceDimensions: boolean;

    length?: number;
    depth?: number;
    height?: number;
    weight?: number;

    ticketLength?: number;
    ticketDepth?: number;
    ticketHeight?: number;

    coinLength?: number;
    coinDepth?: number;
    coinHeight?: number;

    // Printer
    printer?: boolean;

    // Cash Register Program
    program?: boolean;

    // Leds
    leds?: boolean;
}

export enum ProductType {
    COIN_CHANGER = 1,
    CONTROL_TERMINAL = 2
}

export interface ITechnicalFeatures {
    languageCode: string;
    path: string;
}

export interface IGalleryItem {
    src: string;
    thumbnail?: string;
    isVideo: boolean;
}