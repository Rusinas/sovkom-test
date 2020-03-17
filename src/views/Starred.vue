<template lang="pug">
.starred
    Search
    Draggable.starred(v-if="starred.length" v-model="starred" handle=".handle" @end="$store.dispatch('updateLocalStorage')")
        WordCard(v-for="starred in $store.state.starred" :key="starred.word" :word="starred" :draggable="true")

    .no-starred(v-else) You didn't star any words
</template>

<script>
import Draggable from 'vuedraggable'

import WordCard from '@/components/WordCard'
import Search from '@/components/Search'

export default {
    name: 'Starred',
    components: {
        Search,
        WordCard,
        Draggable
    },
    data() {
        return {
            test: [
                1, 2, 3, 4, 5
            ]
        }
    },
    computed: {
        starred: {
            get() {
                return this.$store.state.starred
            },
            set(value) {
                this.$store.commit('SET_STARRED', value)
            }
        }
    }
}
</script>

<style lang="sass" scoped>
.no-starred 
    display: flex
    width: 100% 
    min-height: 150px 
    align-items: center 
    justify-content: center  
</style>