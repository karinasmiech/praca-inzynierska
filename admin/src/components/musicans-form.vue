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
                        <v-col>
                            <v-text-field
                                v-model="edit.name"
                                @input="handleFormChange"
                                label="Imię i nazwisko"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="edit.instrument"
                                @input="handleFormChange"
                                label="Instrument"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="edit.photoUrl"
                                @input="handleFormChange"
                                label="Link do zdjęcia"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea
                                v-model="edit.description"
                                @input="handleFormChange"
                                label="Opis"
                            ></v-textarea>
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
import MusicansService from '@/services/musicans-service';

export default {
    name: 'MusicansForm',
    computed: {
        ...mapGetters('musicans', [
            'mode',
            'edit'
        ]),
        dialog: {
            get() {
                return this.$store.getters['musicans/dialog'];
            },
            set(value) {
                this.$store.commit('musicans/SET_DIALOG', value);
            }
        },
        title() {
            const updateMode = this.mode === MusicansService.formMode.UPDATE;

            return updateMode ? 'Edytuj muzyka' : 'Dodaj Muzyka';
        }
    },
    methods: {
        handleSave() {
            const updateMode = this.mode === MusicansService.formMode.UPDATE;

            return updateMode
                ? this.$store.dispatch('musicans/updateMusican')
                : this.$store.dispatch('musicans/createMusican');
        },
        handleFormChange() {
            this.$store.commit('musicans/SET_EDIT', this.edit);
        }
    }
};
</script>
