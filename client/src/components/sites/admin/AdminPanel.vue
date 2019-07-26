<template lang="pug">
    div.admin-container
        nav.nav-bar
            <router-link to='/'>Strona Główna</router-link>
            button.logout(@click='logout')
                | Wyloguj
        div.grid-wrapper(v-if='adminWrapper')
            div.admin-content(@click='check()' data-url='coaches')
                i(class='fas fa-users')
                p.content
                    | Trenerzy
            div.admin-content(@click='check()' data-url='offers')
                i(class='far fa-newspaper')
                p.content
                    | Karnety
            div.admin-content(@click='check()' data-url='gallery')
                i(class='fas fa-camera')
                p.content
                    | Zdjęcia
        div.content-container(v-if='coaches')
            | TRENERZY
        div.content-container(v-if='offers')
            div.method-get
                | Karnety
            div.method-post
            div.method-update
        div.content-container(v-if='gallery')
            | Galeria
</template>
<script>
export default {
    name: 'AdminPanel',
    data() {
        return {
            adminWrapper: true,
            coaches: false,
            offers: false,
            gallery: false,
        }
    },
    methods: {
        logout() {
            // eslint-disable-next-line
            console.log('Wylogowano!');
        },
        checkIsLogged() {
            // checking if admin is logged in
        },
        check() {
            let ev = event.target;
            if(!event.target.classList.contains('admin-content')){
                ev = event.target.closest('.admin-content');
            }
            this[ev.attributes['data-url'].value] = true;
            this.adminWrapper = false;
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
        min-height: 100vh;

        background-image: url('../../../assets/banner_bg.jpg');
        background-repeat: no-repeat;
        background-size: 400%;
        background-position: 50% 50%;
        background-attachment: fixed;

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
        .grid-wrapper{
            display: grid;
            align-items: center;
            justify-items: center;
            justify-content: center;

            width: 80%;
            height: 80%;
            background-attachment: fixed;
            
            grid-template-columns: 1fr;

            .admin-content{
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;

                box-shadow: 2px 2px 10px 3px #000;
                background-color: rgba(158,0,18,.9);
                height: 30vw;
                width: 80%;
                margin: 20px 0;

                align-self: end;

                transition: all .3s ease-in-out;

                &:hover{
                    cursor: pointer;
                    color: darken(#fff, 20%);
                }

                i{
                    font-size: 2em;
                }
                .content{
                    font-size: 1.5em;
                    margin: 10px 0;
                }
            }
        }

        .content-container{
            display: flex;

            color: #fff;
            background-color: rgba(0,0,0,.8);
            width: 100vw;
            min-height: 300px;
            padding: 10px 5px;
        }
    }

@media (min-width: 480px){
    .admin-container{
        .grid-wrapper{
            .admin-content{
                width: 60%;
            }
        }
    }
}

@media (min-width: 768px){
    .admin-container{
        background-size: 200%;
        .grid-wrapper{
            grid-template-columns: 1fr 1fr;
            .admin-content{
                width: 80%;
                height: 20vw;
            }
        }
    }
}

@media (min-width: 1024px){
    .admin-container{
        background-size: cover;
        .grid-wrapper{
            width: 100%;
            grid-template-columns: repeat(3, 1fr);
            .admin-content{
                font-size: 30px;
                width: 90%;
            }
        }
    }
}

</style>
