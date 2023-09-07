<script setup lang="ts">
import { appEnv } from "../../../env/env";
import { Character } from "./types";
import BackIcon from "../../../assets/back-icon.svg";

const router = useRouter();
const characterId = useRoute().params.character;

const character = ref<Character>();

const { data: characterData } = await useFetch<Character>(`${appEnv.api}/character/${+characterId}`);
character.value = characterData.value!;
</script>
<template>
    <NuxtLink href="/">
        <img :src="BackIcon" alt="back" />
    </NuxtLink>
    <div class="flex gap-5 mt-5 text-right">
        <img :src="characterData!.image" alt="" />
        <div>
            <h1 class="text-xl font-bold">{{ character!.name }}</h1>
            <h3 class="">{{ character!.species }}</h3>
            <h3>{{ character!.location.name }}</h3>
        </div>
    </div>
</template>
