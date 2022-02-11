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
    position: relative;
    bottom: 0px;
    width: 100%;
    border-top: 2px solid rgb(103, 109, 112);
    background-color: rgba(75, 74, 74, 0.11);
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