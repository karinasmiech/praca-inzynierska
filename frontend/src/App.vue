<template>
    <div id="app">
        <base-header/>
        <div class="home">
            <div class="home_background d-flex fill_height">
                <div class="home_content text-center m-auto">
                    <div class="home_subtitle">Nowe koncerty niebawem</div>
                    <div class="home_title"><h1>Zespół XYZ</h1></div>
                </div>
            </div>
        </div>

        <div id="shows" class="shows">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="section_title_container">
                            <div class="section_subtitle">Wydarzenia</div>
                            <div class="section_title"><h1>Koncerty</h1></div>
                        </div>
                    </div>
                </div>
                <div class="row shows_row">
                    <div class="col-lg-8 order-lg-1 order-2 shows_list_col">
                        <div class="shows_list_container">
                            <ul class="shows_list" v-if="concertsData.data.length">
                                <base-show
                                    v-for="show in concertsData.data"
                                    :key="show.id"
                                    :show="show"
                                />
                            </ul>
                            <div v-else class="home_title">
                                <h1>Brak koncertów</h1>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 order-lg-2 order-1">
                        <div class="shows_image">
                            <div class="image_overlay"></div>
                            <img
                                src="https://images.pexels.com/photos/2927080/pexels-photo-2927080.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260">
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div id="artist" class="artist" v-if="artists.length">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="section_title_container">
                            <div class="section_subtitle">Muzycy</div>
                            <div class="section_title"><h1>Skład zespołu</h1></div>
                        </div>
                    </div>
                </div>
                <base-artist
                    v-for="artist in artists"
                    :key="artist.id"
                    :artist="artist"
                    class="mt-5"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from './services/api-service';
import BaseHeader from './components/base-header.vue';
import BaseShow from './components/base-show.vue';
import BaseArtist from './components/base-artist.vue';

export default {
    name: 'App',
    components: {
        BaseHeader,
        BaseShow,
        BaseArtist
    },
    data() {
        return {
            concertsData: {
                data: []
            },
            artists: []
        };
    },
    created() {
        ApiService
            .fetchConcerts()
            .then(data => this.concertsData = data);

        ApiService
            .fetchMusicans()
            .then(data => this.artists = data);
    },
};
</script>

<style lang="scss">
@import "./styles/main_styles.css";
@import "./styles/responsive.css";

.home_background {
    background: url('https://images.pexels.com/photos/1845844/pexels-photo-1845844.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260') center/cover no-repeat;
}

.artist {
    padding-top: 100px;
}
</style>
