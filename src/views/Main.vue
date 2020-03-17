<template lang="pug">
.main
    Search(v-model="searchString" @search="search" @part-selected="setPartOfSpeech")
    .results(v-if="!loading && results.length")
        WordCard(v-for="result in results" :key="result.word" :word="result")
    .no-results(v-else-if="!loading && !results.length") Что
    .loading(v-else) Загрузка
</template>

<script>
import axios from 'axios'
import Search from '@/components/Search'
import WordCard from '@/components/WordCard'

const http = axios.create({
    baseURL: 'https://wordsapiv1.p.mashape.com/',
    headers: {
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        'x-rapidapi-key': '8515eb0ef3mshd29d7c6018a09acp1127bcjsn0218121f2558'
    }
})

export default {
    name: 'Main',
    components: {
        Search,
        WordCard
    },
    data() {
        return {
            loading: true,
            searchString: 'free',
            partOfSpeech: null, 
            results: []
        }
    },
    mounted() {
        this.search()
    },
    methods: {
        async search() {
            if (!this.searchString) return 


            try {
                this.loading = true

                let url = `/words/?letterPattern=^${this.searchString}&limit=10`
                if (this.partOfSpeech) url += `&partOfSpeech=${this.partOfSpeech}`

                const { data: { results: { data: result } } } = await http.get(url)

                // Костыль, чтобы получить определения найденных слов. 
                // Отрабатывает ужасно долго :/ 
                // Увы, обычный поиск выдает только массив строк и не более.
                // Результаты отсортированы по алфавиту по умолчанию, поэтому от меня не требуется доп. действий
                let wordsWithDetails = await Promise.all([
                    ...result.map(word => {
                        return http.get(`/words/${word}`).then(result => result.data)
                    })
                ])

                wordsWithDetails = wordsWithDetails.map(item => {
                    // Немного костыльно приходится приводить к удобному формату данных
                    // Это нужно для нормального отображения дополнительных определений
                    const definitions = {}
                    const topDefinition = item.results && item.results.length ? item.results[0].definition : null
                    const partOfSpeech = item.results && item.results.length ? item.results[0].partOfSpeech : null

                    if (item.results) {

                        for (let def of item.results) {

                            if (!definitions[def.partOfSpeech]) {
                                definitions[def.partOfSpeech] = []
                            }

                            definitions[def.partOfSpeech].push(def.definition)
                        }
                    }

                    return {
                        word: item.word,
                        definition: topDefinition,
                        partOfSpeech,
                        definitions
                    }
                })

                this.results = wordsWithDetails

            } catch (error) {
                console.error('Ошибка:', error)
            } finally {
                this.loading = false
            }
        },
        setPartOfSpeech(value) {
            value = value ? value.toLowerCase() : null
            this.partOfSpeech = value
        }
    }
}
</script>

<style lang="sass" scoped>
.main

.results 

.loading, .no-results
    width: 100% 
    min-height: 150px 
    display: flex 
    align-items: center
    justify-content: center 

</style>