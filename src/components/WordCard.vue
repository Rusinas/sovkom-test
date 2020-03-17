<template lang="pug">
.word-card(@click="toggleDetails")
    .word-row
        .handle(v-if="draggable") H
        .word-info
            .word {{ word.word }}

            template(v-if="word.results && word.results.length")
                .part {{ word.results[0].partOfSpeech }}
                .description {{ word.results[0].definition }}

        .star(@click.stop="save") {{ isStarred }}

    .details(v-if="showDetails")
        span Детальные детали
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'WordCard',
    props: ['word', 'draggable'],
    data() {
        return {
            showDetails: false
        }
    },
    computed: {
        isStarred() {
            return this.$store.getters.isStarred(this.word.word)
        }
    },
    methods: {
        ...mapActions(['addStarred', 'removeStarred']),
        toggleDetails() {
            this.showDetails = !this.showDetails
            console.log('Показываем детали')
        },
        save() {
            if (this.isStarred) {
                this.removeStarred(this.word)
                console.log("Удаляем!")
            } else {
                this.addStarred(this.word)
                console.log("Сохраняем!")
            }
        }
    }
}
</script>

<style lang="sass" scoped>
.word-card 
    cursor: pointer
    display: flex 
    flex-direction: column
    // align-items: center
    justify-content: center
    width: 100%
    padding: 17px 20px 
    box-sizing: border-box 
    background-color: white 
    margin-top: 10px

.word-row
    display: flex
    width: 100%

.word-info
    // width: 100% 
    overflow: hidden
    flex-grow: 1
    display: flex
    box-sizing: border-box 


.word, .part
    margin-right: 20px

.word 
    font-weight: bold
    white-space: nowrap
    

.part
    font-style: italic

.description
    // flex: none
    white-space: nowrap
    overflow: hidden
    width: 100% 
    max-width: 100% 
    text-overflow: ellipsis

.star
    cursor: pointer
    width: 30px
    display: flex 
    align-items: center 
    justify-content: center 

.handle 
    width: 30px 
    cursor: pointer

.details
    margin: 20px 0 10px
</style>