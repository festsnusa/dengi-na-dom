<script setup lang="ts">
import { appEnv } from '../../../env/env'
import { Episode } from './types'
import { Character } from '../Character/types'
import BackIcon from '../../../assets/back-icon.svg'

const episodeId = useRoute().params.episode
const episode = ref<Episode>()
const { data: episodeData } = await useFetch<Episode>(
    `${appEnv.api}/episode/${+episodeId}`,
)
episode.value = episodeData.value!

const personImages = await Promise.all(
    episode!.value.characters.slice(0, 5).map(async (url) => {
        const imageUrl = await useFetch<Character>(url)
        return {
            personLink: url.split('/').at(-1),
            imageUrl: imageUrl.data.value!.image,
        }
    }),
)
</script>
<template>
    <NuxtLink href="/">
        <img :src="BackIcon" alt="home" />
    </NuxtLink>
    <div>
        <h1>{{ episodeData!.name }}</h1>
        <h1>{{ episodeData!.air_date }}</h1>
        <img :src="episode!.url" alt="" />
        <div class="flex">
            <NuxtLink v-for="personImage of personImages" :href="`/character/${personImage.personLink}`">
                <img :src="personImage.imageUrl" alt="" />
            </NuxtLink>
        </div>
    </div>
</template>
