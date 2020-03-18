<template lang="pug">
.word-card(@click="toggleDetails")
    .word-row
        .handle(v-if="draggable")
            DragHandleIcon
        .word-info
            .word {{ word.word }}
            .part {{ word.partOfSpeech }}

            .transcription(v-if="showDetails")
            .description(v-else) {{ word.definition }}

        .star(@click.stop="save") 
            StarFilledIcon(v-if="isStarred")
            StarIcon(v-else)

    .details(v-if="showDetails && Object.keys(word.definitions).length")
        .title Other definitions
        .definitions
            .definition-group(v-for="(definitions, key, index) in word.definitions") 
                .definition-group-title {{ Object.keys(word.definitions)[index] }}
                .definition(v-for="(def, index) in definitions") {{ index + 1 }}. {{ def }}

    .no-definition(v-else-if="showDetails") No definition found
</template>

<script>
import { mapActions } from 'vuex'
import StarIcon from '@/components/Svg/StarIcon'
import StarFilledIcon from '@/components/Svg/StarFilledIcon'
import DragHandleIcon from '@/components/Svg/DragHandleIcon'

export default {
    name: 'WordCard',
    props: ['word', 'draggable'],
    components: {
        StarIcon,
        StarFilledIcon,
        DragHandleIcon
    },
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
        },

        save() {
            if (this.isStarred) {
                this.removeStarred(this.word)
            } else {
                this.addStarred(this.word)
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
    border: 1px dashed #dadada
    border-radius: 4px

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
    font-size: 14px

.word 
    font-weight: bold
    white-space: nowrap

.part
    font-style: italic

.description
    font-size: 14px
    // flex: none
    white-space: nowrap
    overflow: hidden
    width: 100% 
    max-width: 100%
    text-overflow: ellipsis

.star
    margin-left: 10px
    cursor: pointer
    width: 30px
    display: flex 
    align-items: center 
    justify-content: center 

.handle 
    // width: 30px
    transform: translateY(1px)
    // padding: 0 10px
    margin-right: 20px
    cursor: pointer

.details
    margin: 20px 0 10px

    .title
        font-weight: bold 
        color: #212121
        font-size: 14px
    
.definition-group-title
    font-size: 14px
    font-weight: bold
    margin-top: 15px

.definition 
    font-size: 13px
    margin: 9px 0

.no-definition
    font-weight: bold 
    color: #212121
    font-size: 14px
    margin: 20px 0 0
</style>