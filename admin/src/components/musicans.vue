<template>
    <v-container>
        <h1>Zespół</h1>
        <v-btn small @click="showCreateForm()" class="mb-4 mt-4">Dodaj członka zespołu</v-btn>
        <v-row>
            <musican
                v-for="musican in musicans"
                :key="musican.id"
                :musican="musican"
                @update="showUpdateForm"
                @delete="deleteMusican"
            />
        </v-row>
        <musicans-form/>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MusicansForm from '@/components/musicans-form.vue';
import Musican from '@/components/musican.vue';

export default {
    name: 'Musicans',
    components: {
        MusicansForm,
        Musican
    },
    methods: {
        ...mapActions('musicans', [
            'showCreateForm',
            'showUpdateForm',
            'fetchMusicans',
            'deleteMusican'
        ])
    },
    created() {
        this.fetchMusicans();
    },
    computed: {
        ...mapGetters('musicans', [
            'musicans'
        ])
    }
}
</script>
