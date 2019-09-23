<template>
    <div>
    </div>
</template>
<script>
export default {
  name: 'PageTitle',
};
</script>
<style lang='scss'>

    $default_site_color: #9E0012;

    .page-title{
        width: 100%;
        height: auto;

        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;

        i{
            font-size: 2em;
            margin-top: 10px;
        }

        p{
            margin: 0;
            padding: 0;
            font-size: 1.5em;

            position: relative;

            &::after{
                content: '';
                width: 100%;
                height: 2px;
                background-color: $default_site_color;

                position: absolute;
                bottom: -10px;
                left: 0;
            }
        }
    }

    @media (max-width: 768px){
            .page-title{
                p{
                    margin-top: -5px;

                    &::after{
                        bottom: -5px;
                    }
                }
            }
        }
</style>
