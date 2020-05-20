<template>
    <v-container>
        <div class="overline mt-4">Administrator</div>
        <v-row>
            <v-col cols="12" md="4" class="text--secondary">
                <v-icon>mdi-account</v-icon>
                Nazwa: {{user.name}}
            </v-col>
        </v-row>
        <v-row class="mb-6">
            <v-col cols="12" md="4" class="text--secondary">
                <v-icon>mdi-login</v-icon>
                Login: {{user.login}}
            </v-col>
        </v-row>
        <div v-if="edit">
            <v-form disabled ref="userForm" v-model="userFormValid" @submit.prevent="updateUser">
                <div class="overline mt-4">Edycja</div>
                <v-row>
                    <v-col cols="12" md="4" class="pb-0">
                        <v-text-field
                            v-model="edit.name"
                            :disabled="loadingUser"
                            label="Imię i nazwisko"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4" class="pb-0">
                        <v-text-field
                            v-model="edit.login"
                            :disabled="loadingUser"
                            :rules="[v => !!v || 'Login jest wymagany']"
                            label="Login"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-btn
                            :disabled="loadingUser"
                            small
                            outlined
                            class="mr-2"
                            @click="cancel()"
                        >Anuluj
                        </v-btn>
                        <v-btn
                            :disabled="loadingUser"
                            :loading="loadingUser"
                            small
                            outlined
                            color="primary"
                            type="submit"
                        >Zapisz
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
        <div v-if="passwords">
            <div class="overline mt-4">Zmiana hasła</div>
            <v-form ref="passwordForm" v-model="passwordsValid" @submit.prevent="updatePassword">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                            v-model="passwords.oldPassword"
                            :disabled="loadingPasswords"
                            type="password"
                            label="Stare hasło"
                            :rules="[v => !!v || 'Wpisz stare hasło']"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                            v-model="passwords.newPassword"
                            :disabled="loadingPasswords"
                            type="password"
                            label="Nowe hasło"
                            counter
                            :rules="[
                                v => !!v || 'Wpisz nowe hasło',
                                v => v && v.length > 3 || 'Hasło musi mieć co najmniej 4 znaki'
                            ]"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                            v-model="passwords.repeatPassword"
                            :disabled="loadingPasswords"
                            validate-on-blur
                            type="password"
                            label="Powtórz hasło"
                            :rules="[
                                v => !!v || 'Powtórz hasło',
                                v => passwords.newPassword === v || 'Hasła się różnią'
                            ]"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-btn
                            :disabled="loadingPasswords"
                            small
                            outlined
                            class="mr-2"
                            @click="cancelPassword"
                        >Anuluj
                        </v-btn>
                        <v-btn
                            :disabled="loadingPasswords"
                            :loading="loadingPasswords"
                            small
                            outlined
                            color="primary"
                            type="submit"
                        >Zapisz
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
        <div v-show="!edit && !passwords">
            <v-btn tile outlined @click="editUser" class="mr-2">
                <v-icon left>mdi-pencil</v-icon>
                Edytuj
            </v-btn>
            <v-btn tile outlined @click="editPassword">
                <v-icon left>mdi-pencil</v-icon>
                Zmień hasło
            </v-btn>
        </div>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Account',
    data() {
        return {
            userFormValid: false,
            passwordsValid: false
        };
    },
    methods: {
        editUser() {
            this.$store.commit('account/SET_EDIT', Object.assign({}, this.user));
        },
        editPassword() {
            this.$store.commit('account/SET_PASSWORDS', {});
        },
        cancel() {
            this.$store.commit('account/SET_EDIT', null);
        },
        cancelPassword() {
            this.$store.commit('account/SET_PASSWORDS', null);
        },
        updatePassword() {
            this.$refs.passwordForm.validate();

            if (this.passwordsValid) {
                this.$store.dispatch('account/updatePassword');
            }
        },
        updateUser() {
            this.$refs.userForm.validate();

            if (this.userFormValid) {
                this.$store.dispatch('account/updateUser');
            }
        }
    },
    computed: {
        ...mapGetters('account', [
            'user',
            'edit',
            'passwords',
            'loadingUser',
            'loadingPasswords'
        ])
    }
};
</script>
