<template lang="pug">
    #app
        router-view
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('getStarred')
    }
}
</script>

<style lang="sass">
html, body 
    margin: 0px !important
    padding: 0px !important


#app 
    display: flex
    align-items: center 
    justify-content: center
    width: 100% 
    min-height: 100vh
    padding: 40px
    margin: 0
    box-sizing: border-box 
    font-family: Avenir, Helvetica, Arial, sans-serif
    background-color: #f3f3f3

</style>
