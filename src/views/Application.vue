<template lang="pug">
.application
    Header
    router-view
</template>

<script>
import Header from '@/components/Header'

export default {
    name: 'Application',
    components: {
        Header
    }    
}
</script>

<style lang="sass" scoped>
.application
    width: 800px 
    background-color: white
    border-radius: 8px
    box-shadow: 0 5px 25px rgba(0,0,0,0.05)
    padding: 20px
    box-sizing: border-box 
</style>