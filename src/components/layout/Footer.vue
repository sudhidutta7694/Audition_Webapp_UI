<template>
    <div class="footer">
        <strong>Made with ❤️ by GLUG🐧</strong>
    </div>
</template>

    <script>
export default {
    name: "Footer",
};
</script>
<style scoped>
.footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    border-top: 2px solid rgb(0, 160, 253);
    background-color: rgba(43, 43, 43, 0.11);
    backdrop-filter: blur(8px);
    height: 45px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 4;
    font-family: Rubik;
}
</style>