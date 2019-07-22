<template lang="pug">
    div.container
        div.content-header
            i(class='far fa-frown')
            | Nie znaleziono
        div.content
            | Podana Przez ciebie strona nie została znaleziona
        div.router
            <router-link to='/'>Strona Główna</router-link>
</template>
<script>
export default {
    name: 'SiteNotFound',
};
</script>
<style lang="scss" scoped>

    $default_site_color: #9e0012;

    .container{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;

        width: 100vw;
        height: 100vh;

        background-color: $default_site_color;
        color: #fff;
        font-size: 20px;
        text-align: center;

        .content-header{
            display: flex;
            flex-flow: column;

            justify-content: center;
            align-items: center;
            text-transform: uppercase;
            margin: 50px 0;
            font-size: 1.5em;
            i{
                margin-bottom: 20px;
                font-size: 5em;
            }
        }

        .router{
            margin: 30px 0;

            a{
                color: $default_site_color;
                padding: 10px;
                border: 1px solid rgba(0,0,0,.9);
                background-color: rgba(0,0,0,.9);
                text-decoration: none;
                transition: all .3s ease-in-out;

                &:hover{
                    color: #fff;
                }
            }
        }
    }
</style>
