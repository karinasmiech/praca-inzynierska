<template>
    <div>
        <header class="header" :class="{ scrolled }">
            <div class="header_content d-flex flex-row align-items-center justify-content-center">
                <div class="logo"><a href="#">Zespół XYZ</a></div>
                <nav class="main_nav">
                    <ul class="d-flex flex-row align-items-start justify-content-start">
                        <li><a href="#">Home</a></li>
                        <li><a href="#shows">Koncerty</a></li>
                        <li><a href="#artist">Zespół</a></li>
                    </ul>
                </nav>
                <div class="hamburger ml-auto" @click="active = true">
                    <div class="d-flex flex-column align-items-end justify-content-between">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </header>
        <div class="menu" :class="{ active }">
            <div>
                <div class="menu_overlay"></div>
                <div
                    class="menu_container d-flex flex-column align-items-start justify-content-center">
                    <nav class="menu_nav">
                        <ul class="d-flex flex-column align-items-start justify-content-start">
                            <li v-for="item in menuItems" @click="active = false">
                                <a :href="item.href">{{item.label}}</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BaseHeader',
    data() {
        return {
            scrolled: false,
            active: false,
            menuItems: [
                {
                    href: '#',
                    label: 'Home'
                },
                {
                    href: '#shows',
                    label: 'Koncerty'
                },
                {
                    href: '#artists',
                    label: 'Zespół'
                }
            ]
        };
    },
    mounted() {
        const $window = $(window);

        $window.on('resize scroll', () => this.scrolled = $window.scrollTop() > 91);
        $('.hamburger').on('click', () => this.active = true);
        $('.menu_overlay').on('click', () => this.active = false);
    }
};
</script>
