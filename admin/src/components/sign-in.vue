<template>
    <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="12" md="4">
                <v-card class="elevation-12">
                    <v-form
                        @input.native="clearError"
                        ref="form"
                        v-model="valid"
                        @submit.prevent="onSubmit"
                    >
                        <v-card-title>
                            <h4>Zaloguj się</h4>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field
                                v-model="username"
                                prepend-icon="mdi-account"
                                label="Login"
                                :disabled="loading"
                                :rules="[v => !!v || 'Login jest wymagany']"
                            />
                            <v-text-field
                                v-model="password"
                                prepend-icon="mdi-lock"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                label="Hasło"
                                :disabled="loading"
                                :rules="[v => !!v || 'Hasło jest wymagane']"
                                @click:append="showPassword = !showPassword"
                            />
                            <v-alert v-show="error" dense outlined type="error">{{error}}</v-alert>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                block
                                type="submit"
                                color="primary"
                                :disabled="loading"
                                :loading="loading"
                            >Zaloguj</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'SignIn',
    computed: {
        ...mapGetters('auth', [
            'error',
            'loading'
        ]),
        showPassword: {
            get() {
                return this.$store.getters['auth/showPassword'];
            },
            set(value) {
                this.$store.commit('auth/SET_PASSWORD_VISIBILITY', value);
            }
        },
        valid: {
            get() {
                return this.$store.getters['auth/valid'];
            },
            set(value) {
                this.$store.commit('auth/SET_VALID', value);
            }
        },
        username: {
            get() {
                return this.$store.getters['auth/username'];
            },
            set(value) {
                this.$store.commit('auth/SET_USERNAME', value);
            }
        },
        password: {
            get() {
                return this.$store.getters['auth/password'];
            },
            set(value) {
                this.$store.commit('auth/SET_PASSWORD', value);
            }
        }
    },
    methods: {
        ...mapActions('auth', [
            'signIn'
        ]),
        onSubmit() {
            this.clearError();

            if (!this.valid) {
                return this.$refs.form.validate();
            }

            this.signIn()
                .then(() => this.$router.replace({ path: '/' }))
                .catch(error => this.$store.dispatch('auth/signInErrorHandler', error));
        },
        clearError() {
            if (this.error) {
                this.$store.commit('auth/SET_ERROR', null);
            }
        }
    }
};
</script>
