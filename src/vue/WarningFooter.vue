<style scoped lang="stylus">
//參考文章 https://www.minwt.com/webdesign-dev/css/11522.html
.warning_footer{
    width:100%;
    height:100px;
    line-height:100px;
    position:fixed;
    left:0;
    bottom:0;
    z-index:2;
    overflow:hidden;    
    text-align:justify;
    text-justify: inter-ideograph;
    /* text-justify:distribute-all-lines;*/
    font-size:38px;
    font-family:'微軟正黑體';
    color:#fff;
    background:#000;
}
.warning_footer:after{
    content:"";
    width:100%;
    display:inline-block;
}
.warning_footer span{
    opacity:0;
    color:#000;
    font-size:12px;
}
@media screen and (max-width:990px) {
    .warning_footer{
        font-size:30px;
        letter-spacing:-3px;
    }
}
@media screen and (max-width:640px) {
    .warning_footer{
        font-size:24px;
    }
}
.warning_footer .img{
    display:inline-block;
    width: 66px;
    height: 66px;
    vertical-align:middle;
    background:url('~warning_footer_icon.png')
}
</style>


<template>
    <!-- warning start -->
    <div class="warning_footer"><span>-</span> 禁 止 酒 駕 <div class='img'></div> 酒 後 不 開 車　安 全 有 保 障 <span>-</span></div>
    <!-- warning end -->
</template>

<script>
</script>