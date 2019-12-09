$("h4").on("mouseover",function(){
    $(this).next("ul").stop().show();
})
$(".ul-all").on("mousleave",function(){
    $(this).stop().hide();
    // console.log(1); 
})

$(".ul-all").children("li").on("mouseover",function(){
    $(this).addClass("active");
    $(this).find("div").stop().show();
});
$(".ul-all").children("li").on("mouseout",function(){
    $(this).removeClass("active");
    $(this).find("div").stop().hide();
})


$(".nav li").click(function(){
    var i = $(this).index();
    var t = $(".floor-t").eq(i).offset().top;
    $("html").animate({
        scrollTop:t
    })
})