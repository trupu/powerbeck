<template lang="pug">
    footer#footer.footer-container
        div.footer-container_logo
            p.logo
                | Powerbeck
            p.logo-mini
                | Gym & Fitness
        div.footer-container_info
            div.address
                i(class='fas fa-home')
                p
                    | Grota Roweckiego 6,<br />67-120 Kożuchów
            div.phone
                i(class='fas fa-phone-alt')
                p
                    | 767 564 604
            div.time
                i(class='far fa-clock')
                p
                    | Czynne: <br />
                    |   Pn-Pt: 7:00-22:00 <br />
                    |   Sb-Nd: 10:00-16:00
        div.footer-container_social
            div.social-wrapper
                a(href='#')
                    i(class='fab fa-facebook-f')
                a(href='#')
                    i(class='fab fa-instagram')
            div.rights-wrapper
                p
                    | &copy;2019 Sławomir Trubiłowicz
</template>
<script>
export default {
    name: 'Footer',
};
</script>
<style lang='scss'>
    #footer{
        display: grid;
        grid-template-columns: 1fr;
        background-color: #000112;
        color: #4149ff;

        text-align: center;

        padding: 20px 5px;

        font-size: 20px;

        .footer-container_logo{
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            p{
                margin: 0;
            }
            .logo{
                font-size: 2em;
            }
            .logo-mini{
                font-size: 1.2em;
            }
        }

        .footer-container_info{
            display: flex;

            flex-flow: column;
            align-items: flex-start;
            justify-content: center;

            font-size: .8em;

            .address, .phone, .time{
                display: flex;
                flex-flow: row;

                margin-left: 40px;

                align-items: center;
                justify-content: center;

                i{
                    font-size: 2em;
                    margin: 0 20px;
                }
            }
        }

        .footer-container_social{
            display: flex;
            flex-flow: column;

            align-items: center;
            justify-content: center;

            .social-wrapper{
                font-size: 2em;
                a{
                    margin: 0 20px;
                    text-decoration: none;
                    color: #4149ff;

                    &:hover{
                        color: lighten(#4149ff, 20%);
                    }
                }
            }

            .rights-wrapper{
                font-size: .8em;
                p:first-letter{
                    font-size: .7em;
                }
            }
        }
    }

@media (max-width: 768px){
    #footer{
        .footer-container_info{
            align-items: center;
            justify-content: center;

            .address, .phone, .time{
                margin: 0;
            }
        }
    }
}

@media (min-width: 768px){
    #footer{
        grid-template-columns: repeat(3, 1fr);

        .footer-container_logo{
            grid-area: 1 / 1 / 1 / 1;
        }
        .footer-container_social{
            grid-area: 1 / 2 / 1 / 2;
        }
        .footer-container_info{
            grid-area: 1 / 3 / 1 / 3;
        }
    }
}
</style>
