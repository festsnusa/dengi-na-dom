
export type CharacterData = {
    info: {
        count: number
        next: string
        pages: 42
        prev: null
    }
    results: {
        created: string
        episode: string[]
        gender: string
        id: number
        image: string
        location: {
            name: string
            url: string
        }
        name: string
        origin: {
            name: string
            url: string
        }
        species: string
        status: string
        type: string
        url: string
    }[]
}

export type HomeCharacterProps = {
    name: string
    species: string
    image: string
    episodes: string[]
}