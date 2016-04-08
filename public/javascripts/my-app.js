// Initialize your app
var myApp = new Framework7({
    // pushState: true,
    // swipePanel: 'left',
    // fastClicks:true,
    material:true
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    // dynamicNavbar: true
});

//让所有class为link的a标签，在点击跳转页面时弹出loading
$$(document).on('pageInit','.page[data-page]',function(e){
    $$('a.link').on('click', function () {
        var a=$$('.view').attr('data-page');
        myApp.showPreloader();
        setInterval(function(){
            if($$('.view').attr('data-page')!=a){
              myApp.hidePreloader();
            }
        },100);
    });
    // alert();
});
$$(document).on('pageInit', '.page[data-page="login"]', function (e) {
    
    myApp.login.buttonLoading(function(){
        setTimeout(myApp.login.buttonSpread,1000);
    });

});  
$$(document).on('pageInit', '.page[data-page="exam"],.page[data-page="exam2"]', function (e) {
    hljs.initHighlightingOnLoad();
    $$('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    codeStyle();

}); 



/*--禁用滚动--*/
// $$('body')[0].addEventListener('touchstart', function (ev) {
//   ev.preventDefault();
// });

/*---Login---*/
myApp.login=myApp.login||{};
myApp.login.buttonLoading=function(cb){
    var btn=$$('#loginBtn');
    btn.click(function(event) {
        btn.addClass('loginBtn-shrink');

        cb&&cb();
    });
}
myApp.login.buttonSpread=function(){
    var btn=$$('#loginBtn');
    var pos=btn.offset();
    btn.addClass('loginBtn-spread');

    setTimeout(function(){
       mainView.router.load({
        url:'main.html'
        // ,reload:true
       });
        // btn.removeClass('loginBtn-shrink').removeClass('loginBtn-spread');
    },500);

}
myApp.login.buttonLoading(function(){
    setTimeout(myApp.login.buttonSpread,2000);
});

/*----Exam----*/
function codeStyle(){
    myApp.styleToggle=$$(".code-style-toggle");
    myApp.styleToggle.styleArray=["monokai-sublime","github-gist","dracula","gruvbox-light","zenburn","tomorrow"];
    myApp.styleToggle.styleIndex=0;

    myApp.styleToggle.codeStyleChange=function(){
        var styleIndex=myApp.styleToggle.styleIndex=(myApp.styleToggle.styleIndex>=myApp.styleToggle.styleArray.length)?0:myApp.styleToggle.styleIndex;
        $$("#code-style").prop("href","stylesheets/highlight/"+myApp.styleToggle.styleArray[styleIndex]+".css");
        myApp.styleToggle.styleIndex++;
    }
    myApp.styleToggle.click(function(){
        // alert();
        myApp.styleToggle.codeStyleChange();
    });
}
codeStyle();