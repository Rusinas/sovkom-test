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
    background-color: white 
    padding: 0 20px 
    box-sizing: border-box

.logo, .starred
    cursor: pointer
    &:hover 
        color: blue
</style>