<template lang="pug">
.header
    router-link.logo(to="/app" tag="div") Word Keeper
    router-link.starred(to="/app/starred" tag="div") Starred Words
</template>

<script>
export default {
    
}
</script>

<style lang="sass" scoped>
.header 
    display: flex 
    width: 100% 
    justify-content: space-between
    align-items: center 
    height: 60px
    margin-bottom: 20px
    background-color: #26A69A 
    padding: 0 20px 
    box-sizing: border-box
    border-radius: 5px

.logo, .starred
    font-weight: bold
    color: white
    cursor: pointer
    transition: color .1s linear 

    &:hover 
        color: #dadada
</style>