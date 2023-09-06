<script setup lang="ts">
import { CharacterData } from './types'
import HomeCharacter from './HomeCharacter.vue';
import Input from '../ui/input/Input.vue'

const characters = ref<CharacterData>()

const { data: newCharacters } = await useFetch<CharacterData>('https://rickandmortyapi.com/api/character/?page=1')
characters.value = newCharacters.value!

// onMounted(async () => {
//     const { data: newCharacters } = await useFetch<CharacterData>('https://rickandmortyapi.com/api/character/?page=1')
//     characters.value = { ...newCharacters.value! }
//     console.log(characters.value, newCharacters.value);
// })

const page = 1
const name = ref('')
const species = ref('')

const handleInput = async () => {
    const nameVal = name.value
    const speciesVal = species.value
    console.log(nameVal);
    const { data: newCharacters } = await useFetch<CharacterData>(`https://rickandmortyapi.com/api/character/?page=1${
        (speciesVal!==''?'&status='+speciesVal:'' )+( nameVal!==''?'&name='+nameVal:'')
    }`)
    // specties=${species.value}&name=${name.value}
    characters.value = newCharacters.value!
}

const handleSelect = async () => {
    const nameVal = name.value
    const speciesVal = species.value
    const { data: newCharacters } = await useFetch<CharacterData>(`https://rickandmortyapi.com/api/character/?page=1${
        (speciesVal!==''?'&status='+speciesVal:'' )+( nameVal!==''?'&name='+nameVal:'')
    }`)
    characters.value = newCharacters.value!
}

</script>
<template>
    <form class="mb-5">
        <input type="text" v-model="name" @input="handleInput" placeholder="Имя персонажа">
        <select v-model="species" @change="handleSelect">
            <option selected disabled value="">Статус</option>
            <option value="alive">Жив</option>
            <option value="dead">Мертв</option>
            <option value="unknown">Неизвестный</option>
        </select>
    </form>
    <div class="grid grid-cols-2 gap-3">
        <h1 v-if="characters?.results.length === 0">Персонажены не найдены</h1>
        <HomeCharacter v-if="characters?.results" v-for="({ name, species, image, episode }, index) in characters.results" :key="index" :name="name" :species="species" :image="image"
            :episodes="episode" />
    </div>
</template>
