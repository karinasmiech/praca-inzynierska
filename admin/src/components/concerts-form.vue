<template>
    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
        <v-card>
            <v-card-title>{{title}}</v-card-title>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="8">
                            <v-text-field
                                v-model="edit.clubName"
                                @input="handleFormChange"
                                label="Nazwa klubu"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-dialog v-model="dateModal" width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="edit.date"
                                        label="Data koncertu"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-on="on"
                                    />
                                </template>
                                <v-date-picker
                                    locale="pl"
                                    v-model="edit.date"
                                    @input="handleDatePick"
                                    scrollable
                                />
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="8">
                            <v-text-field
                                v-model="edit.address.route"
                                label="Ulica"
                                @input="handleFormChange"
                            />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="edit.address.streetNumber"
                                label="Nr lokalu"
                                @input="handleFormChange"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="edit.address.locality"
                                label="Miejscowość"
                                @input="handleFormChange"
                            />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="edit.address.postalCode"
                                label="Kod pocztowy"
                                @input="handleFormChange"
                            />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="edit.address.country"
                                label="Kraj"
                                @input="handleFormChange"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="8">
                            <v-text-field
                                v-model="edit.ticketPrice"
                                label="Cena biletu"
                                @input="handleFormChange"
                            />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-checkbox
                                v-model="edit.publish"
                                label="Publikuj"
                                required
                                @change="handleFormChange"
                            />
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn small text @click="dialog = false">Anuluj</v-btn>
                <v-btn small text @click="handleSave">Zapisz</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import ConcertsService from '@/services/concerts-service';

export default {
    name: 'ConcertsForm',
    data() {
        return {
            dateModal: false
        };
    },
    computed: {
        ...mapGetters('concerts', [
            'mode',
            'edit'
        ]),
        dialog: {
            get() {
                return this.$store.getters['concerts/dialog'];
            },
            set(value) {
                this.$store.commit('concerts/SET_DIALOG', value);
            }
        },
        title() {
            const updateMode = this.mode === ConcertsService.formMode.UPDATE;

            return updateMode ? 'Edytuj koncert' : 'Dodaj koncert';
        }
    },
    methods: {
        handleDatePick() {
            this.dateModal = false;
            this.$emit('input', this.value);
        },
        handleSave() {
            const updateMode = this.mode === ConcertsService.formMode.UPDATE;

            return updateMode
                ? this.$store.dispatch('concerts/updateConcert')
                : this.$store.dispatch('concerts/createConcert');
        },
        handleFormChange() {
            this.$store.commit('concerts/SET_EDIT', this.edit);
        }
    }
};
</script>
