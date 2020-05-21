<template>
    <li class="d-flex flex-row align-items-center justify-content-start">
        <div>
            <div class="show_date">{{showDate}}</div>
        </div>
        <div
            class="show_info d-flex flex-md-row flex-column align-items-md-center align-items-start justify-content-md-start justify-content-center">
            <div class="show_name">{{show.clubName}}</div>
            <div class="show_location">{{show.address.locality}}, {{show.address.country}}</div>
        </div>
        <div class="ml-auto">
            <div class="show_shop trans_200">{{show.ticketPrice}}</div>
        </div>
    </li>
</template>
<script>
export default {
    name: 'BaseShow',
    props: {
        show: Object
    },
    computed: {
        showDate() {
            return this.show.date ? this.formatDate(this.show.date) : 'Brak daty';
        }
    },
    methods: {
        formatDate(showDate) {
            const date = new Date(showDate);

            return date.toLocaleString().split(',')[0].split('.').join('/');
        }
    }
};
</script>
