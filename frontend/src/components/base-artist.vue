<template>
    <div class="row">
        <div class="col-lg-4 artist_image_col">
            <div class="artist_image">
                <img :src="photoUrl" :alt="artist.name">
            </div>
        </div>
        <div class="col-lg-7 offset-lg-1">
            <div class="artist_content">
                <div class="section_title_container">
                    <div class="section_subtitle">{{artist.instrument}}</div>
                    <div class="section_title"><h1>{{artist.name}}</h1></div>
                </div>
                <div class="artist_text">
                    <p>{{artist.description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseArtist',
    props: {
        artist: Object
    },
    computed: {
        photoUrl() {
            return this.artist.photoUrl || `https://api.adorable.io/avatars/285/${this.artist.name}.png`;
        }
    }
}
</script>
