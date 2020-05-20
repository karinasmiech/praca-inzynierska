<template>
    <v-col cols="12" sm="6" md="4">
        <v-card>
            <v-img
                :src="photoUrl"
                height="300px"
                gradient="to bottom, rgba(0,0,0,.8), rgba(0,0,0,.1), rgba(0,0,0,.8)"
            >
                <v-card-title class="white--text fill-height flex-column">
                    <v-row style="width: 100%;">
                        <v-spacer/>
                        <v-btn dark icon @click="$emit('update', musican)">
                            <v-icon dark>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn dark icon class="ml-4" @click="$emit('delete', musican.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-row>
                    <v-row class="align-end">
                        <div class="display-1">{{musican.name}}</div>
                    </v-row>
                </v-card-title>
            </v-img>
            <v-list two-line>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle>Instrument</v-list-item-subtitle>
                        <v-list-item-title>{{musican.instrument}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider/>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle>Opis</v-list-item-subtitle>
                        <v-list-item-title>{{musican.description}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </v-col>
</template>

<script>
export default {
    name: 'Musican',
    props: {
        musican: Object
    },
    computed: {
        photoUrl() {
            const defaultPhoto = `https://api.adorable.io/avatars/285/${this.musican.name}.png`;

            return this.musican.photoUrl || defaultPhoto;
        }
    }
}
</script>
