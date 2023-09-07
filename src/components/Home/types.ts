import { Character } from "../Character/types";

export type CharacterData = {
    info: {
        count: number;
        next: string;
        pages: 42;
        prev: null;
    };
    results: Character[];
};

export type HomeCharacterProps = {
    name: string;
    species: string;
    image: string;
    episodes: string[];
    id: number;
};
