<template lang="pug">
    div.admin-container
        nav.nav-bar
            <router-link to='/'>Strona Główna</router-link>
            button.logout(@click='logout')
                | Wyloguj
        div.grid-wrapper(v-if='adminWrapper')
            div.admin-content(@click='checkClicked()' data-url='coaches')
                i(class='fas fa-users')
                p.content
                    | Trenerzy
            div.admin-content(@click='checkClicked(), getOffer()' data-url='offers')
                i(class='far fa-newspaper')
                p.content
                    | Karnety
            div.admin-content(@click='checkClicked()' data-url='gallery')
                i(class='fas fa-camera')
                p.content
                    | Zdjęcia
        div.content-container(v-if='coaches')
            | TRENERZY
        div.content-container(v-if='offers')
            div.method-get(ref='offerElement')
                h3
                    | Karnety
                div.get-wrapper
                    div.anim(v-if='!offerCreated')
                        div.circle
                        div.circle
                        div.circle
            div.method-post
                button.button-small(@click='showForm("offer")')
                    | Dodaj karnet
            div.method-update
                button.button-small
                    | Modyfikuj
        div.content-container(v-if='gallery')
            | Galeria
        div.form(v-if='formShowed.offer')
            div.form-wrapper
                | Drupal
                i(class='fas fa-times exit-button' @click='hideForm("offer")')
</template>
<script>
import Buttons from '../../pieces/Buttons.vue';
import Offers from '../../../mixins/offers';

export default {
    name: 'AdminPanel',
    components: {
        Buttons,
    },
    data() {
        return {
            adminWrapper: true,
            coaches: false,
            offers: false,
            gallery: false,
            Offers,
            offerCreated: false,
            formShowed: {
                offer: false,
                coaches: false,
                gallery: false,
            },
        };
    },
    methods: {
        logout() {
            // eslint-disable-next-line
            console.log('Wylogowano!');
        },
        checkIsLogged() {
            // checking if admin is logged in
        },
        createContent(data, parent) {
            const table = document.createElement('table');
            const trth = document.createElement('tr');
            // eslint-disable-next-line
            for (const key in data[0]) {
                // eslint-disable-next-line
                if (key !== '_id') {
                    const th = document.createElement('th');
                    th.innerHTML = key;
                    trth.appendChild(th);
                }
            }
            table.appendChild(trth);
            // eslint-disable-next-line
            for (const key in data) {
                const tr = document.createElement('tr');
                // eslint-disable-next-line
                for (const i in data[key]) {
                    // eslint-disable-next-line
                    if (data[key][i] !== data[key]._id) {
                        const td = document.createElement('td');
                        td.innerHTML = data[key][i];
                        tr.appendChild(td);
                    }
                }
                const td = document.createElement('td');
                const button = document.createElement('button');
                // eslint-disable-next-line
                button.setAttribute('data-id', data[key]._id);
                button.classList.add('button-small');
                button.innerHTML = 'Usuń';
                td.appendChild(button);
                tr.appendChild(td);
                table.appendChild(tr);
            }
            parent.appendChild(table);
        },
        async getOffer() {
            if (this.offerCreated) return;
            const data = await this.Offers.Offer.getOffer();
            this.createContent(data, this.$refs.offerElement);
            this.offerCreated = true;
        },
        checkClicked() {
            let ev = event.target;
            if (!event.target.classList.contains('admin-content')) {
                ev = event.target.closest('.admin-content');
            }
            this[ev.attributes['data-url'].value] = true;
            this.adminWrapper = false;
        },
        showForm(data) {
            this.formShowed[data] = true;
        },
        hideForm(data) {
            this.formShowed[data] = false;
        },
    },
};
</script>
<style lang="scss">

$default_site_color: #9E0012;

@keyframes circle-anim{
    0%{
        transform: scale(0);
        opacity: 0;
    }
    50%{
        transform: scale(1);
        opacity: 1;
    }
    100%{
        transform: scale(0);
        opacity: 0;
    }
}

.anim{
    display: flex;
    flex-flow: row;
    margin: 20px 0;

    .circle{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: $default_site_color;
        margin: 0 5px;
        animation: circle-anim 1s both infinite ease-in-out;
    }

    @for $i from 1 to 4{
        .circle:nth-child(#{$i}){
            animation-delay: (10s*$i)/100;
        }
    }
}

table{
    padding: 5px;
    font-size: 18px;
    width: 100%;
    height: auto;
    border-collapse: collapse;

    th{
        font-size: .8em;
        padding: 5px;
    }

    td{
        padding: 5px;
        font-size: .6em;

        button{
            font-size: 1em;
        }
    }
}

.form{
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    color: #fff;
    position: fixed;
    top: 0;
    left: 0;

    background-color: rgba(0,0,0,.5);

    .form-wrapper{
        display: flex;
        width: 60%;
        height: 300px;
        background-color: rgba(0,0,0,.5);
        position: relative;
        padding: 10px;

        .exit-button{
            position: absolute;
            top: 15px;
            right: 15px;

            transition: all .3s ease-in-out;

            &:hover{
                cursor: pointer;
                color: $default_site_color;
            }
        }
    }
}

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
            flex-flow: column;

            color: #fff;
            background-color: rgba(0,0,0,.8);
            width: 100vw;
            min-height: 300px;
            padding: 15px 10px;

            h3{
                margin: 0;
            }

            .get-wrapper{
                display: flex;
                flex-flow: column;
            }

            .method-post{
                margin: 20px 0;
            }
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
    table{
        font-size: 24px;
    }
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
