<template>
    <div>
        <h2>Zespół</h2>
        <v-card max-width="375">
            <v-img
                :src="`https://api.adorable.io/avatars/285/${'asdf'}.png`"
                height="300px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
            >
                <v-row class="fill-height justify-center">
                    <v-btn icon>
                        <v-icon>mdi-trash</v-icon>
                    </v-btn>
                    <v-card-title class="white--text align-content-end">
                        <div class="display-1">{{'Jan Kowalski'}}</div>
                    </v-card-title>
                </v-row>
            </v-img>
            <v-list two-line>
                <v-list-item @click="">
                    <v-list-item-icon>
                        <v-icon color="indigo">mdi-login</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>aliconnors@example.com</v-list-item-title>
                        <v-list-item-subtitle>Login</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Crew'
}
</script>
