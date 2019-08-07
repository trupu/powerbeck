<template lang="pug">
    div
        div.method-get(ref='getElement' :data-name='this.$parent.clickedContainer')
            h3
                | {{ this.$parent.clickedTranslated }}
            div.get-wrapper(ref='getParent')
                div.anim(v-if='!created')
                    div.circle
                    div.circle
                    div.circle
        div.methods-flex-wrapper
            div.method-post
                button.button-small.tochange(@click='showForm("add")')
                    | Dodaj {{ this.$parent.divs[this.$parent.clickedContainer].formTitle }}
            div.method-update
                button.button-small.tochange(@click='showForm("modify")')
                    | Modyfikuj
            div.exit-text(@click='hideComponent()')
                | Powrót
        div.alert-container(v-if='deleting')
            div.alert
                p.message
                    | Czy na pewno chcesz usunąć "{{ deleting }}"?
                div.buttons
                    button.action-button.action-yes.button-medium(@click='action' data-action='yes')
                        | Tak
                    button.action-button.button-medium-reverse(@click='action' data-action='no')
                        | Nie
                p.message-little
                    | Uwaga operacja jest nieodwracalna!
                div.anim-flexbox
                    div.anim(v-if='sending')
                                div.circle
                                div.circle
                                div.circle
        div.admin-form(v-if='formShowed')
            div.admin-form-wrapper
                h3.form-title
                    | {{this.formTitle}} {{this.$parent.divs[this.$parent.clickedContainer].formTitle}}
                div.form-content
                    label(v-for='(key, el) in returnedData[0]' v-if='el !== "_id"')
                        | {{ el }}:
                        input(type='text' :name='el' :placeholder='key' class='form-input' autocomplete='off')
                div.send
                    button.button-medium(@click='validateForm($parent.clickedContainer, formType)')
                        | Wyślij
                div.anim-flexbox
                    div.anim(v-if='sending')
                        div.circle
                        div.circle
                        div.circle
                div.error-flexbox
                    p.error-handler(v-if='statusMessage' :class='colorHandler')
                        | {{ statusMessage }}
                i(class='fas fa-times exit-button' @click='hideForm()')
</template>
<script>
import offer from '../../../mixins/offers';

export default {
    name: 'SiteContentChanger',
    data() {
        return {
            buttonSize: 'button-small',
            buttonSizeReverse: 'button-small-reverse',
            deleting: '',
            colorHandler: '',
            sending: false,
            formType: '',
            formTitle: '',
            statusMessage: '',
            returnedData: '',
            created: false,
            newestTable: '',
            formShowed: false,
            offer,
        };
    },
    methods: {
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
                button.setAttribute('data-parent-name', parent.attributes['data-name'].value);
                button.setAttribute('data-name', data[key].name);
                button.classList.add('button-small');
                button.innerHTML = 'Usuń';
                button.addEventListener('click', this.firstlyDelete);
                td.appendChild(button);
                tr.appendChild(td);
                table.appendChild(tr);
            }
            parent.appendChild(table);
            this.newestTable = table;
        },
        // loading offers from database
        async getData(name) {
            if (!this[name]) {
                this.$refs.getParent.innerHTML = '<p>(404) Metoda jeszcze nie stworzona!</p>';
                this.created = true;
                return;
            }
            this.created = false;
            const data = await this[name].getData();
            // eslint-disable-next-line
            data.map(el => delete el['__v']);
            this.createContent(data, this.$refs.getElement);
            this.returnedData = data;
            this.created = true;
        },
        // sending data to database
        async postData(name, data) {
            this.sending = true;
            const send = await this[name].postData(data);
            this.sending = false;
            if (send.status === false) {
                this.colorHandler = 'red';
                this.statusMessage = send.message;
                return;
            }
            this.created = false;
            if (this.newestTable) this.newestTable.remove();
            await this.getData(this.$parent.clickedContainer);
            this.created = true;
            this.colorHandler = 'green';
            this.statusMessage = 'Wartość dodana pomyślnie! (just feedback // backend POST method temporary not available)';
        },
        // modyfing data from database
        async modifyData(name, data) {
            alert(name);
        },
        // alert "are you sure that you want to delete content?"
        firstlyDelete() {
            const id = event.target.attributes['data-id'].value;
            const name = event.target.attributes['data-parent-name'].value;
            this.deleting = event.target.attributes['data-name'].value;
            setTimeout(() => {
                const button = document.querySelector('.action-yes');
                button.setAttribute('data-id', id);
                button.setAttribute('data-name', name);
            }, 10);
        },
        // deleting data
        async deleteData(id, name) {
            this.sending = true;
            await this[name].deleteData(id);
            this.sending = false;
            this.created = false;
            if (this.newestTable) this.newestTable.remove();
            await this.getData(this.$parent.clickedContainer);
            this.created = true;
            this.deleting = '';
        },
        action() {
            const ev = event.target;
            // eslint-disable-next-line
            if(ev.attributes['data-action'].value !== 'yes') {
                this.deleting = '';
                return;
            }
            const id = event.target.attributes['data-id'].value;
            const name = event.target.attributes['data-name'].value;

            this.deleteData(id, name);
        },
        // hiding this component
        hideComponent() {
            this.$parent.adminWrapper = true;
            this.$parent.clickedContainer = '';
        },
        // showing add/modify form
        showForm(type) {
            // eslint-disable-next-line
            type === 'add' ? this.formTitle = 'Dodaj' : this.formTitle = 'Modyfikuj';
            this.formType = type;
            this.formShowed = true;
        },
        // hiding add/modify form
        hideForm() {
            this.formShowed = false;
        },
        validateForm(name, method) {
            if (!this[name]) {
                this.errorMessage = 'Metoda jeszcze niedostępna!';
                return;
            }
            const inputs = document.querySelectorAll('.form-input');
            const inputsArray = Array.from(inputs);

            const err = inputsArray.find(el => el.value === '');

            if (err) {
                this.colorHandler = 'red';
                this.statusMessage = 'Proszę wypełnić wszystkie pola!';
                return;
            }
            this.errorMessage = '';
            const arrayValues = {};
            // eslint-disable-next-line
            inputsArray.forEach(el => arrayValues[el.attributes.name.value] = el.value);

            // eslint-disable-next-line
            method === 'add' ? this.postData(this.$parent.clickedContainer, arrayValues) : this.modifyData(this.$parent.clickedContainer, arrayValues);
        },
        // regulating buttons size
        buttonSizeChanger() {
            setTimeout(() => {
                if (window.innerWidth > 768) {
                    this.buttonSize = 'button-small';
                    this.buttonSizeReverse = 'button-small-reverse';
                } else {
                    this.buttonSize = 'button-medium';
                    this.buttonSizeReverse = 'button-medium-reverse';
                }
            }, 500);
        },
    },
    created() {
    },
    mounted() {
        this.buttonSizeChanger();
        this.getData(this.$parent.clickedContainer);
        window.addEventListener('resize', this.buttonSizeChanger);
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

.alert-container{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .alert{
        display: flex;
        flex-flow: column;
        background-color: rgba(0,0,0,.8);
        box-shadow: 0 0 5px 3px #000;
        width: 60%;
        min-height: 400px;

        align-items: center;
        justify-content: center;

        .message{
            font-size: 1.5em;
            color: #fff;
            text-align: center;
        }
        .message-little{
            font-size: 1em;
            color: red;
        }
        .buttons{
            display: flex;
            flex-flow: row;

            button{
                margin: 10px 20px;
            }
        }
    }
}

.error-flexbox{
    width: 100%;
    min-height: 50px;
}

.anim-flexbox{
    display: flex;
    width: 100%;
    height: 50px;

    align-items: center;
    justify-content: center;
    margin-top: 20px;
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
    padding: 5px 10px;
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
        flex-flow: column;
        justify-content: center;
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
            font-size: 1.5em;

            transition: all .3s ease-in-out;

            &:hover{
                cursor: pointer;
                color: $default_site_color;
            }
        }

        .form-content{
            display: flex;
            flex-flow: column;

            align-items: center;
            justify-content: center;

            margin: 30px 0;

            label{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                font-size: 1.2em;

                margin: 10px 0;
                position: relative;

                input{
                    margin: 0 5px;
                    background: none;
                    border:none;
                    border-bottom: 1px solid $default_site_color;
                    color: #fff;
                    font-size: 1em;
                    position: absolute;
                    right: 0;
                    text-align: center;

                    &::placeholder{
                        color: lighten(#262626, 10);
                        font-size: .8em;
                    }

                    &:focus{
                        border: none;
                    }
                }
            }
        }
        .send{
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;
        }
        .error-handler{
            width: 100%;
            text-align: center;
            font-size: 1em;
        }
        .red{
            color: red;
        }
        .green{
            color: green;
        }
    }
}

.content-container{
    h3{
        margin: 0;
    }

    .method-get{
        padding: 0;
        max-width: 100%;
    }

    .get-wrapper{
        display: flex;
        flex-flow: column;

        p{
            color: red;
            font-size: 1.2em;
        }
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

        .exit-text{
            font-size: 1.5em;
            text-transform: uppercase;

            transition: all .3s ease-in-out;

            &:hover{
                cursor: pointer;
                color: $default_site_color;
            }
        }
    }
}

@media (max-width: 768px){
    .content-container{
        .methods-flex-wrapper{
            .exit-text{
                font-size: .8em;
            }
        }
    }

    .admin-form{
        .admin-form-wrapper{
            width: 80%;
        }
    }

    .alert-container{
        .alert{
            width: 80%;
        }
    }
}

@media (max-width: 480px){
    .admin-form{
        .admin-form-wrapper{
            width: 100%;
            .form-content{
                label{
                    input{
                        width: 150px;
                    }
                }
            }
        }
    }
    .alert-container{
        .alert{
            width: 100%;
            .buttons{
                flex-flow: column;
                button{
                    margin: 20px 0;
                }
            }
        }
    }
}

</style>
