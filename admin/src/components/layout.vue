<template>
    <div>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item link to="/koncerty">
                    <v-list-item-action>
                        <v-icon>mdi-settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Koncerty
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/uzytkownicy">
                    <v-list-item-action>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Użytkownik</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>{{username || 'admin'}}</v-toolbar-title>
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
            drawer: null
        };
    },
    computed: {
        ...mapGetters(['snackbarText']),
        ...mapGetters('auth', ['username']),
        snackbar: {
            get() {
                return this.$store.getters['snackbar'];
            },
            set(value) {
                this.$store.commit('SET_SNACKBAR', value);
            }
        }
    },
    methods: mapActions('auth', ['signOut'])
};
</script>
