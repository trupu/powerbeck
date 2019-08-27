<template lang="pug">
div
    div.login-form-container(v-if='this.isLoginForm')
        div.login-form-wrapper
            div.form-title
                | Panel Administracyjny
            div.form
                label
                    i(class='fas fa-user')
                    input(type='text' name='login' placeholder='Login' v-model='loginFormLogin' autocomplete='off' required)
                    <br />
                label
                    i(class='fas fa-lock')
                    input(type='password' name='password' placeholder='Hasło' v-model='loginFormPassword' autocomplete='off' required)
                    <br />
                button(@click='checkLoginData()' :disabled='loginLoading')
                    | Zaloguj
                div.loading-anim(v-if='loginLoading')
                    div.circle
                    div.circle
                    div.circle
                p.login-error(v-if='loginStatus')
                    | {{ loginStatus }}
                i(class='fas fa-times exit-button' @click='hideLoginForm()')
    div.login-form-container(v-if='this.isContactForm')
        div.contact-form-wrapper
            div.form-title
                | Kontakt
            form(action='/contact' method='POST' autocomplete='off')
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
import hash from 'crypto-js/sha256';
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
            // Temporary - production
            loginFormLogin: 'powerbeckadmin',
            loginFormPassword: 'powerbeckadmin',
            loginStatus: '',
            loginLoading: false,
        };
    },
    methods: {
        showLoginForm() {
            if (this.$session.exists()) {
                this.$router.push('/adminpanel');
            } else {
                this.isLoginForm = true;
            }
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
        // basic validation
        validateForm() {
            if (this.loginFormLogin === '' || this.loginFormPassword === '') {
                return false;
            }
            return true;
        },
        // checking login data
        checkLoginData() {
            if (!this.validateForm()) {
                this.loginStatus = 'Wypełnij wszystkie pola!';
                return;
            }
            const tempPass = hash(this.loginFormPassword).toString();
            this.loginStatus = '';
            this.loginLoading = true;
            const data = this.lm.LoginService.getData();
            if (data) {
                data.then((val) => {
                    /* eslint-disable-next-line */
                    const login = val.find((el) => el.login === this.loginFormLogin );
                    if (login && login.password === tempPass) { // Succesful login
                        this.$session.start();
                        this.$router.push('/adminpanel');
                    } else {
                        this.loginStatus = 'Niepoprawne dane logowania!';
                    }
                    this.loginLoading = false;
                });
            } else {
                this.loginLoading = false;
                this.loginStatus = 'Błąd połączenia z serwerem!';
            }
        },
    },
};
</script>
<style lang="scss">

$default_site_color: #9e0012;

@keyframes loading-button{
    0%{
        transform: translateY(0);
    }
    50%{
        transform: translateY(-10px);
    }
    80%{
        transform: translateY(0);
    }
    100%{

    }
}

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

        .form, form{
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

                display: flex;
                flex-flow: row;
                align-items: center;
                justify-content: center;

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

                .loading-main{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 2px solid $default_site_color;

                    margin: 0 10px;
                }
            }
            .contact-form-button{
                float: right;
            }

            .loading-anim{
                display: flex;
                align-items: center;
                justify-content: center;

                width: 100%;

                position: absolute;
                left: 0;
                bottom: 10%;

                .circle{
                    height: 10px;
                    width: 10px;
                    border-radius: 50%;
                    background-color: $default_site_color;
                    margin: 40px 5px 0 5px;

                    animation: loading-button 1s infinite both ease-in-out;
                }
                @for $i from 1 to 4{
                    .circle:nth-child(#{$i}){
                        animation-delay: 0s + ($i*5/100);
                    }
                }
            }

            .login-error{
                color: $default_site_color;
                font-size: .8em;
                text-align: center;
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
        .login-form-wrapper, .contact-form-wrapper{
            width: 60%;
        }
    }
}

@media (max-width: 480px){
    .login-form-container{
        .login-form-wrapper, .contact-form-wrapper{
            width: 100%;

            .exit-button{
                right: 40px;
            }
        }
    }
}

</style>
