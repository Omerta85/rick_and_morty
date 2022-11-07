export interface Episodes {
    info:    EpisodesInfo;
    results: EpisodesResult[];
}

export interface EpisodesInfo {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}

export interface EpisodesResult {
    id:         number;
    name:       string;
    air_date:   string;
    episode:    string;
    characters: string[];
    url:        string;
    created:    Date;
}
