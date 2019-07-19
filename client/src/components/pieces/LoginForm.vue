<template lang="pug">
div
    div.login-form-container(v-if='this.isLoginForm')
        div.login-form-wrapper
            div.form-title
                | Panel Administracyjny
            div.form
                label
                    i(class='fas fa-user')
                    input(type='text' name='login' placeholder='Login' v-model='loginFormLogin' required)
                    <br />
                label
                    i(class='fas fa-lock')
                    input(type='password' name='password' placeholder='Hasło' required)
                    <br />
                button(@click='lm.LoginService.getData()')
                    | Zaloguj
                i(class='fas fa-times exit-button' @click='hideLoginForm()')
    div.login-form-container(v-if='this.isContactForm')
        div.contact-form-wrapper
            div.form-title
                | Kontakt
            form(action='/contact' method='POST')
                label
                    i(class='fas fa-user')
                    input(type='text' name='login' placeholder='imię' v-model='contactFormName' required)
                    <br />
                label
                    i(class='fas fa-at')
                    input(type='email' name='email' placeholder='e-mail' v-model='contactFormEmail' required)
                    <br />
                label.text-area-label
                    i(class='fas fa-envelope')
                    textarea(name='message' rows='8' cols='50' v-model='contactFormMessage' required)
                    <br />
                button.contact-form-button
                    | Wyślij
                i(class='fas fa-times exit-button' @click='hideContactForm()')
</template>
<script>
import loginMethods from '../methods/loginMethod';

export default {
    name: 'LoginForm',
    data() {
        return {
            lm: loginMethods,
            isLoginForm: false,
            isContactForm: false,
            contactFormName: '',
            contactFormEmail: '',
            contactFormMessage: '',
            loginFormLogin: '',
            serverUrlLogin: 'http://localhost:5000/login',
        };
    },
    methods: {
        showLoginForm() {
            this.isLoginForm = true;
        },
        showContactForm() {
            this.isContactForm = true;
        },
        hideLoginForm() {
            this.isLoginForm = false;
        },
        hideContactForm() {
            this.isContactForm = false;
        },
    },
};
</script>
<style lang="scss">

$default_site_color: #9e0012;

.login-form-container{
    display: flex;

    z-index: 300;

    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.7);

    position: fixed;
    top: 0;
    left: 0;

    align-items: center;
    justify-content: center;

    .login-form-wrapper{
        height: 60%;
    }

    .contact-form-wrapper{
        height: 80%;
    }

    .login-form-wrapper, .contact-form-wrapper{
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;

        position: relative;

        background-color: rgba(0,0,0,.7);
        color: #fff;

        width: 40%;

        padding: 50px 20px;

        box-shadow: 0 0 10px 2px #000;

        .form-title{
            text-align: center;
            font-size: 1.5em;
            text-transform: uppercase;
            font-weight: 400;
            color: #fff;
            margin-bottom: 20px;
        }

        .form{
            label{
                position: relative;

                display: grid;
                grid-template-columns: 1fr 9fr;
                align-items: center;
                justify-content: center;

                width: 200px;
                height: 40px;
                margin: 10px 0;

                border-bottom: 1px solid $default_site_color;

                &:focus, &:hover{
                    input{
                        border: none;
                    }
                }

                input{
                    width: 100%;
                    height: 40px;
                    background: none;
                    border: none;
                    padding-left: 5px;

                    font-size: 1.2em;
                    color: #fff;

                    &:focus, &:active{
                        border: none;
                    }
                }
            }

            .text-area-label{
                width: 100%;
                height: auto;
                align-items: flex-start;
                border-bottom: 1px solid $default_site_color;
                textarea{
                    border: none;
                    background: none;
                    color: #fff;
                    overflow-y: hidden;
                }
            }

            button{
                width: 200px;
                height: 40px;

                background: none;
                border: 1px solid $default_site_color;
                color: #fff;
                font-size: 1.2em;
                font-weight: 700;

                transition: all .3s ease-in-out;

                &:hover{
                    cursor: pointer;
                    background-color: $default_site_color;
                }
            }
            .contact-form-button{
                float: right;
            }
        }

        .exit-button{
            position: absolute;
            right: 15px;
            top: 15px;

            font-size: 1.5em;

            transition: all .3s ease-in-out;

            &:hover{
                cursor: pointer;
                color: $default_site_color;
            }
        }
    }
}

@media (max-width: 768px){
    .login-form-container{
        .login-form-wrapper{
            width: 60%;
        }
    }
}

@media (max-width: 480px){
    .login-form-container{
        .login-form-wrapper{
            width: 100%;

            .exit-button{
                right: 40px;
            }
        }
    }
}

</style>
