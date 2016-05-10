$(function(){



	/*------添加题目按钮------*/
	(function(){
		var questionList=$('.question-list');
		var questionFormWrap=$('.question-form-wrap').eq(0);
		var addQuestionBtn=$('.add-question-btn');
		var addOptionBtn=$('.add-option-btn');

		addQuestionBtn.click(function(){
			var qfwClone=questionFormWrap.clone(true);
			questionList.append(qfwClone);
		});

		addOptionBtn.click(function(e) {
			var optionItem=$(e.target).parent().siblings('.option-list');
			console.log(optionItem);
		});


		/*------添加考试------*/
		$('#createBtn').on('click',function(){

			if(confirm('确定要创建这场考试吗？')){
				jQuery.get('/test/newExam', {}, function(data, textStatus, xhr) {
					console.info('考试创建成功！');
				});
			}	

		});



	})();




});