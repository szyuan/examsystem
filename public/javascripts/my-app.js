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



$$(document).on('pageInit', '.page[data-page="login"]', function (e) {
    
    myApp.login.buttonLoading(function(){
        setTimeout(myApp.login.buttonSpread,1000);
    });

})    



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
        url:'main.html',
        reload:true
       });
        // btn.removeClass('loginBtn-shrink').removeClass('loginBtn-spread');
    },500);

}
myApp.login.buttonLoading(function(){
    setTimeout(myApp.login.buttonSpread,2000);
});