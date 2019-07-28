<template>
<div></div>
</template>

<script>
export default {
  name: 'Buttons',
};
</script>
<style lang='scss'>

    $default_site_color: #9E0012;

    .button-medium, .button-medium-reverse, .button-small, .button-small-reverse{
        text-shadow: 2px 2px 8px #000;
        transition: all .3s ease-in-out;

        &:hover{
            cursor: pointer;
        }
    }

    .button-medium, .button-small{
        background-color: $default_site_color;
        border: 1px solid $default_site_color;
        color: #fff;

        &:hover{
            background: none;
            color: $default_site_color;
        }
    }

    .button-medium-reverse, .button-small-reverse{
        background: none;
        border: 1px solid $default_site_color;
        color: $default_site_color;

        &:hover{
            background: $default_site_color;
            color: #fff;
        }
    }

    .button-small, .button-small-reverse{
        width: 90px;
        height: 30px;
        font-size: .7em;
        font-weight: 700;
    }

    .button-medium, .button-medium-reverse{
        width: 150px;
        height: 50px;
        font-size: 1.3em;
        font-weight: 700;
    }

</style>
