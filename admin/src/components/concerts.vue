<template>
    <div>
        <h1>Koncerty</h1>
        <div class="text-right">
            <v-btn small @click="showCreateForm()" class="mb-4">Dodaj koncert</v-btn>
        </div>
        <v-data-table
            :items="concerts"
            :headers="headers"
            :loading="loading"
            :sort-by="sort.prop"
            :sort-desc="sort.desc"
            :items-per-page="itemsPerPage"
            :server-items-length="totalConcerts"
            :footer-props="{
                'items-per-page-options': [5, 10, 15, 30]
            }"
            @update:options="handleTableOptionsUpdate"
        >
            <template v-slot:item.address.route="{ item }">
                {{item.address.route}} {{item.address.streetNumber}}
            </template>
            <template v-slot:item.publish="{ item }">
                <v-simple-checkbox v-model="item.publish" disabled></v-simple-checkbox>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="showUpdateForm(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteConcert(item.id)">mdi-delete</v-icon>
            </template>
        </v-data-table>
        <concerts-form/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ConcertsForm from '@/components/concerts-form.vue';

export default {
    name: 'Concerts',
    components: {
        ConcertsForm
    },
    data() {
        return {
            headers: [
                { text: 'Data', align: 'start', value: 'date' },
                { text: 'Nazwa klubu', value: 'clubName' },
                { text: 'Ulica', value: 'address.route', sortable: false },
                { text: 'Miejscowość', value: 'address.locality' },
                { text: 'Kod pocztowy', value: 'address.postalCode', sortable: false },
                { text: 'Kraj', value: 'address.country' },
                { text: 'Cena biletu', value: 'ticketPrice', sortable: false },
                {
                    text: 'Opublikowany',
                    value: 'publish',
                    sortable: false,
                    align: 'center',
                    width: 76
                },
                { text: 'Akcje', value: 'actions', sortable: false, align: 'right', width: 73 }
            ]
        };
    },
    created() {
        this.fetchConcerts();
    },
    computed: {
        ...mapGetters('concerts', [
            'concerts',
            'totalConcerts',
            'itemsPerPage',
            'loading',
            'sort'
        ])
    },
    methods: {
        ...mapActions('concerts', [
            'fetchConcerts',
            'showCreateForm',
            'showUpdateForm',
            'handleTableOptionsUpdate'
        ]),
        deleteConcert(concertId) {
            if (confirm('Na pewno chcesz usunąć koncert?')) {
                this.$store.dispatch('concerts/deleteConcert', concertId);
            }
        }
    }
};
</script>
