<template>
    <div>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item link to="/koncerty">
                    <v-list-item-action>
                        <v-icon>mdi-calendar-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Koncerty
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/zespol">
                    <v-list-item-action>
                        <v-icon>mdi-account-group</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Zespół
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/konto">
                    <v-list-item-action>
                        <v-icon>mdi-settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Konto</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                {{username}}
            </v-toolbar-title>
            <v-spacer/>
            <v-btn @click="signOut" text>
                Wyloguj
                <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-content>
        <v-footer app>
            <span>Karina Śmiech &copy; 2020</span>
        </v-footer>
        <v-snackbar v-model="snackbar">
            {{snackbarText}}
            <v-btn color="pink" text @click="snackbar = false">Zamknij</v-btn>
        </v-snackbar>
        <v-snackbar 
            v-model="passwordSnackbar"
            color="black"
            :timeout="0"
            top
        >
            Kliknij tutaj aby zmienić hasło
            <v-btn text small @click="handleSnackbarClick">
                Konto
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    props: {
        source: String
    },
    data() {
        return {
            drawer: null,
            passwordSnackbar: false
        };
    },
    created() {
        const username = this.$store.getters['auth/username'];
        const password = this.$store.getters['auth/password'];

        if (username === 'admin' && password === 'password') {
            this.passwordSnackbar = true;
        }

        this.$store.dispatch('account/fetchData');
    },
    computed: {
        ...mapGetters(['snackbarText']),
        snackbar: {
            get() {
                return this.$store.getters['snackbar'];
            },
            set(value) {
                this.$store.commit('SET_SNACKBAR', value);
            }
        },
        username() {
            return this.$store.getters['account/user'].name || 'admin';
        }
    },
    methods: {
        ...mapActions('auth', ['signOut']),
        handleSnackbarClick() {
            this.$store.commit('account/SET_PASSWORDS', {});
            this.passwordSnackbar = false;

            if (this.$route.name !== 'account') {
                this.$router.push({ name: 'account' });
            }
        }
    }
};
</script>
