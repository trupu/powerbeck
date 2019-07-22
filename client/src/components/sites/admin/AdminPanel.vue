<template lang="pug">
    div.admin-container
        nav.nav-bar
            <router-link to='/'>Strona Główna</router-link>
            button.logout(@click='logout')
                | Wyloguj
        div.banner
            | panel administratora
        div.admin-panel
            div.admin-content
</template>
<script>
export default {
    name: 'AdminPanel',
    methods: {
        logout() {
            // eslint-disable-next-line
            console.log('Wylogowano!');
        },
    },
};
</script>
<style lang="scss">

$default_site_color: #9E0012;

    .admin-container{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        .nav-bar{
            position: fixed;
            top: 0;
            left: 0;

            display: flex;
            align-items: center;
            justify-content: flex-end;

            height: 50px;
            width: 100%;
            background-color: rgba(0,0,0,.5);

            a, .logout{
                text-decoration: none;
                background: none;
                border: none;
                padding: 10px;
                height: 40px;
                min-width: 120px;
                color: #fff;
                font-size: 16px;
                text-shadow: 1px 1px 5px #000;

                transition: all .3s ease-in-out;

                &:hover{
                    cursor: pointer;
                    color: $default_site_color;
                }
            }
        }
        .banner{
            background-image: url('../../../assets/banner_bg.jpg');
            background-repeat: no-repeat;
            background-size: 200%;
            background-position: 50% 50%;
            height: 40vh;
            width: 100%;

            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            text-transform: uppercase;
            text-shadow: 2px 2px 8px #000;

            font-weight: 700;
            font-size: 3em;

            color: rgba(255,255,255,.7);
        }

        .admin-panel{
            width: 100%;
            height: 400px;

            background-color: #fff;
            color: #000;

            .admin-content{
                display: flex;
                align-items:center;
                justify-content: center;

                h3{
                    text-transform: uppercase;
                }
            }
        }
    }

@media (min-width: 768px){
    .admin-container{
        .banner{
            background-size: cover;
        }
    }
}

@media (min-width: 1024px){
    .admin-container{

        .admin-panel{
            width: 70%;
        }
    }
}
</style>
