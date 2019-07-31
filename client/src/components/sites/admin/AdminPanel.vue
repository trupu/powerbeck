<template lang="pug">
    div.admin-container
        nav.nav-bar
            <router-link to='/'>Strona Główna</router-link>
            button.logout(@click='logout')
                | Wyloguj
        div.grid-wrapper(v-if='adminWrapper')
            div.admin-content(@click='checkClicked()' data-url='coach')
                i(class='fas fa-users')
                p.content
                    | Trenerzy
            div.admin-content(@click='checkClicked(), getOffer()' data-url='offer')
                i(class='far fa-newspaper')
                p.content
                    | Karnety
            div.admin-content(@click='checkClicked()' data-url='gallery')
                i(class='fas fa-camera')
                p.content
                    | Zdjęcia
        div.content-container(v-if='coach.showed')
            | TRENERZY
        div.content-container(v-if='offer.showed')
            div.method-get(ref='offerElement')
                h3
                    | Karnety
                div.get-wrapper
                    div.anim(v-if='!offer.created')
                        div.circle
                        div.circle
                        div.circle
            div.methods-flex-wrapper
                div.method-post
                    button.button-small.tochange(@click='showForm("offer", "add")')
                        | Dodaj karnet
                div.method-update
                    button.button-small.tochange(@click='showForm("offer", "modify")')
                        | Modyfikuj
                div.exit-text
                    | Powrót
        div.content-container(v-if='gallery.showed')
            | Galeria
        div.admin-form(v-if='formShowed')
            div.admin-form-wrapper
                h3.form-title
                    | Dodaj karnet
                div.form-content
                i(class='fas fa-times exit-button' @click='hideForm()')
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
            timeout: '',
            adminWrapper: true,
            formShowed: false,
            formName: '',
            formType: '',
            offer: {
                showed: false,
                counter: 0,
                created: false,
            },
            gallery: {
                showed: false,
                counter: 0,
                created: false,
            },
            coach: {
                showed: false,
                counter: 0,
                created: false,
            },
            Offers,
            offerCreated: false,
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
        // creating table with data returned from database
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
        // loading offers from database
        async getOffer() {
            if (this.offer.created) return;
            const data = await this.Offers.getOffer();
            this.createContent(data, this.$refs.offerElement);
            this.offer.created = true;
        },
        // checking which of divs was clicked
        checkClicked() {
            this.ev = event.target;
            if (!this.ev.classList.contains('admin-content')) {
                this.ev = event.target.closest('.admin-content');
            }
            this[this.ev.attributes['data-url'].value].showed = true;
            this.adminWrapper = false;
        },
        // hiding menu of clicked element (for instance offer)
        hideClicked() {
            this[this.ev.attributes['data-url'].value].showed = false;
            this.adminWrapper = true;
        },
        // showing add/modify form
        showForm(name, type) {
            this.formShowed = true;
            this.formName = name;
            this.formType = type;
        },
        // hiding add/modify form
        hideForm() {
            this.formShowed = false;
            this.formName = '';
            this.formType = '';
        },
        // resizing buttons when user changes window width
        buttonsClassNames() {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                const check = document.querySelector('.tochange');
                if (check) {
                    const change = document.querySelectorAll('.tochange');
                    if (window.innerWidth > 768) {
                        if (check.classList.contains('button-small')) {
                            change.forEach((el) => {
                                el.classList.remove('button-small');
                                el.classList.add('button-medium');
                            });
                        }
                    } else if (!check.classList.contains('button-small')) {
                            change.forEach((el) => {
                                el.classList.remove('button-medium');
                                el.classList.add('button-small');
                            });
                        }
                }
            }, 500);
        },
    },
    created() {
        this.buttonsClassNames();
        window.addEventListener('resize', this.buttonsClassNames);
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

.admin-form{
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

    .admin-form-wrapper{
        display: flex;
        width: 60%;
        height: 500px;
        background-color: rgba(0,0,0,.8);
        box-shadow: 0 0 5px 3px #000;
        position: relative;
        padding: 10px;

        h3{
            width: 100%;
            text-align: center;
            font-size: 20px;
            text-transform: uppercase;
            font-weight: 400;
        }

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

            .methods-flex-wrapper{
                display: flex;
                flex-flow: row;

                width: 100%;

                justify-content: space-around;
                align-items: center;

                .method-post{
                    margin: 20px 0;
                }
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
