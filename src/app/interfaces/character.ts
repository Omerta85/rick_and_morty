export interface Character {
    info:    CharacterInfo;
    results: CharacterResult[];
}

export interface CharacterInfo {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}

export interface CharacterResult {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   CharacterLocation;
    location: CharacterLocation;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}

export interface CharacterLocation {
    name: string;
    url:  string;
}
