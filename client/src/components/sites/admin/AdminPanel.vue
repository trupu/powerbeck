<template lang="pug">
    div.admin-container
        | Drupal
</template>
<script>
export default {
    name: 'AdminPanel',
};
</script>
<style lang="scss">
    .admin-container{
        background-color: #000;
        color: #fff;
        z-index: 900;
        width: 100vw;
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 50px;
    }
</style>
