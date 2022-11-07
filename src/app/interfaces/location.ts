export interface Location {
    info:    LocationInfo;
    results: LocationResult[];
}

export interface LocationInfo {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}

export interface LocationResult {
    id:        number;
    name:      string;
    type:      string;
    dimension: string;
    residents: string[];
    url:       string;
    created:   Date;
}
