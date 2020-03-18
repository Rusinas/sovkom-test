<template lang="pug">
.search
    .search-input 
        input(placeholder="Search" @keyup.enter="emitSearch" :value="value" @input="$emit('input', $event.target.value)" )
        button(@click="$emit('search')") Search

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
        },
        emitSearch() {
            this.$emit('search')
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
        margin-bottom: 15px
        display: flex
        

        input 
            border: none
            height: 50px
            width: 100%
            box-sizing: border-box 
            padding: 0 20px
            border: 1px solid #f1f1f1
            border-right: none
            border-radius: 5px 0 0 5px

            &:focus, &:active 
                outline: none

        button
            cursor: pointer
            flex: none
            // width: 60px
            padding: 0 20px
            height: 50px
            border: 1px solid #26A69A 
            background-color: #26A69A 
            color: white
            border-radius: 0 5px 5px 0

            &:focus
                outline: none             

    .options 
        width: 100% 
        display: flex
        padding: 0 10px 
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
                border-radius: 2px
                background-color: #dadada
                margin-right: 5px

            &:hover 
                color: #26A69A 
                
                .option-checkbox 
                    background-color: lighten(#26A69A, 5%)

            &-selected
                color: #212121

                .option-checkbox 
                    background-color: #26A69A 

                &:hover 
                    color: black

                    .option-checkbox 
                        background-color: darken(#26A69A, 5%)
                
</style>