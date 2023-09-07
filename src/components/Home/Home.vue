<script setup lang="ts">
import { CharacterData } from "./types";
import HomeCharacter from "./HomeCharacter.vue";
import Input from "../ui/input/Input.vue";
import { appEnv } from "../../../env/env";

const characters = ref<CharacterData>();

const { data: newCharacters } = await useFetch<CharacterData>("https://rickandmortyapi.com/api/character/?page=1");
characters.value = newCharacters.value!;

onMounted(async () => {
    window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        console.log(bottomOfWindow);
        if (bottomOfWindow) loadData();
    };
});

const name = ref("");
const species = ref("");

const handleInput = async () => {
    const nameVal = name.value;
    const speciesVal = species.value;
    const { data: newCharacters } = await useFetch<CharacterData>(`${appEnv.api}/character/?page=1${(speciesVal !== "" ? "&status=" + speciesVal : "") + (nameVal !== "" ? "&name=" + nameVal : "")}`);
    characters.value = newCharacters.value!;
};

const handleSelect = async () => {
    const nameVal = name.value;
    const speciesVal = species.value;
    const { data: newCharacters } = await useFetch<CharacterData>(`${appEnv.api}/character/?page=1${(speciesVal !== "" ? "&status=" + speciesVal : "") + (nameVal !== "" ? "&name=" + nameVal : "")}`);
    characters.value = newCharacters.value!;
};

const loadData = async () => {
    const nextLink = characters.value?.info.next;
    if (!nextLink) return;
    const { data: newCharacters } = await useFetch<CharacterData>(nextLink);
    characters.value!.info.next = newCharacters.value!.info.next;
    characters.value!.results.push(...newCharacters.value!.results);
};
</script>
<template>
    <form class="mb-5 flex gap-5">
        <input class="p-3 border-black border border-solid rounded outline-none" type="text" v-model="name" @input="handleInput" placeholder="Имя персонажа" />
        <select v-model="species" @change="handleSelect">
            <option selected disabled value="">Статус</option>
            <option value="alive">Жив</option>
            <option value="dead">Мертв</option>
            <option value="unknown">Неизвестный</option>
        </select>
    </form>
    <div class="grid grid-cols-2 gap-3">
        <h1 v-if="characters?.results.length === 0">Персонажены не найдены</h1>
        <HomeCharacter
            v-if="characters?.results"
            v-for="({ name, species, image, episode, id }, index) in characters.results"
            :key="index"
            :name="name"
            :species="species"
            :image="image"
            :episodes="episode"
            :id="id"
        />
    </div>
</template>
