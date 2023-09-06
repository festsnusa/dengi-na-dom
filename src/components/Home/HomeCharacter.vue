<script setup lang="ts">
import { HomeCharacterProps } from './types';

const props = defineProps<HomeCharacterProps>()
</script>

<template>
    <div class="flex gap-4 shadow p-1 justify-between rounded">
        <img class="rounded" :src="props.image" :alt="props.name">
        <div class="text-right">
            <a class="text-xl font-bold" href=""> {{ props.name }} </a>
            <h3 class="">{{ props.species }}</h3>
            <ul>
                <li v-for="(episode, index) in props.episodes.slice(0, 5)" :key="index">
                    <a href="">Эпизод {{ episode.at(-1)! }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>