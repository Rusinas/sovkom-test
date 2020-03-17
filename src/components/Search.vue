<template lang="pug">
.search
    .search-input 
        input(placeholder="Search" :value="value" @input="$emit('input', $event.target.value)")
        button(@click="$emit('search')") S

    .options  
        .option(
            v-for="option in options" 
            :class="{ 'option-selected': selectedOption === option}"
            @click="selectPartOfSpeech(option)")
            .option-checkbox
            | {{ option }}
</template>

<script>
export default {
    name: 'Search',
    props: ['value'],
    data() {
        return {
            selectedOption: null,
            options: [
                'Adjective',
                'Verb',
                'Noun'
            ]
        }
    },
    methods: {
        // Апишка, опять же, позволяет искать только по одной части речи
        selectPartOfSpeech(part) {
            if (this.selectedOption === part) this.selectedOption = null
            else this.selectedOption = part

            this.$emit('part-selected', this.selectedOption)
        }
    }
}
</script>

<style lang="sass" scoped>
.search
    display: flex 
    flex-direction: column
    width: 100% 
    background-color: white

    &-input 
        display: flex

        input 
            border: none
            height: 60px
            width: 100%
            box-sizing: border-box 
            padding: 0 20px
            margin-bottom: 10px

            &:focus, &:active 
                outline: none

        button
            flex: none
            width: 60px
            height: 60px
            border: none

    .options 
        width: 100% 
        display: flex
        padding: 0 20px 
        margin-bottom: 10px
        box-sizing: border-box

        .option
            display: flex 
            align-items: center 
            cursor: pointer 
            margin-right: 15px
            font-size: 12px 
            color: #dadada

            &-checkbox 
                width: 10px 
                height: 10px 
                background-color: #dadada
                margin-right: 5px

            &:hover 
                color: blue 
                
                .option-checkbox 
                    background-color: blue

            &-selected
                color: #212121

                .option-checkbox 
                    background-color: orange

                &:hover 
                    color: black

                    .option-checkbox 
                        background-color: red
                
</style>