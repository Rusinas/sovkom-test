<template lang="pug">
.starred
    h4 Starred
    Search(v-model="searchString" @input="search" @part-selected="setPartOfSpeech")

    Draggable.starred(v-if="starred.length && !searchString && !partOfSpeech" v-model="starred" handle=".handle" @end="$store.dispatch('updateLocalStorage')")
        WordCard(v-for="starred in $store.state.starred" :key="starred.word" :word="starred" :draggable="true")

    .filtered-results(v-else-if="starred.length")
        WordCard(v-for="starred in filtered" :key="starred.word" :word="starred")

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
            searchString: '',
            partOfSpeech: null,
            filtered: []
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
    },
    methods: {
        search() {
            this.filtered = this.$store.state.starred.filter(item => {
                if (this.partOfSpeech) {
                    return item.word.toLowerCase().includes(this.searchString.toLowerCase()) && item.partOfSpeech === this.partOfSpeech
                } else {
                    return item.word.toLowerCase().includes(this.searchString.toLowerCase())
                }
            })
        },
        setPartOfSpeech(value) {
            value = value ? value.toLowerCase() : null
            this.partOfSpeech = value
            this.search()
        }
    }
}
</script>

<style lang="sass" scoped>
.no-starred 
    font-size: 14px
    color: #BDBDBD
    display: flex
    width: 100% 
    min-height: 100px 
    align-items: center 
    justify-content: center  
</style>