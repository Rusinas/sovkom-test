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
    background-color: #f1f1f1
    padding: 20px
    box-sizing: border-box 
</style>