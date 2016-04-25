$(function(){



	/*------添加题目按钮------*/
	(function(){
		var questionList=$('.question-list');
		var questionFormWrap=$('.question-form-wrap').eq(0);
		var addQuestionBtn=$('.add-question-btn');
		addQuestionBtn.click(function(){
			var qfwClone=questionFormWrap.clone(true);
			questionList.append(qfwClone);
		});

	})();


});