/** @jsx React.DOM */

'use strict';

var React = require('react'),

    Quiz = React.createClass({
        getInitialState: function(){

            return {
                question:"",
                answer1:"",
                answer2:"",
                answer3:"",
                answer4:"",
                answer5:"",
                programmingLanguage:"",
                code:""
            }
        },

        sarQuiz: function(quizName){
            this.quizName = quizName;
            this.answers = [];
            this.questions = ['Question A','Question B','Question C'];
        },


        getQuizName: function() {
        return this.quizName;
        },

        getQuestion: function() {
            return this.questions[2];
            // need shuffle & array pop
        },

        registerAnswer: function(question,answer) {
           // this.answers.push(answer);
           // $(".spm").css("opacity",0.5);
           // $(".spm").attr("disabled", "disabled");
        },

        getQuizFromApi: function(id) {
        var react = this;
        var spm = $(".spm");
        var question = $(".questionTitle");
        $.getJSON( "http://api.robbestad.com/programmingquiz/"+id, function( data ) {
            react.setState({
                question:data.question,
                code:data.code,
                programmingLanguage:data.programmingLanguage,
                answer1:data.answer1,
                answer2:data.answer2,
                answer3:data.answer3,
                answer4:data.answer4,
                answer5:data.answer5
            });
                Rainbow.color($(".questionTitle"));
                question.addClass("animated bounceIn");
                spm.css("opacity",1);
                question.css("opacity",1);
                spm.addClass("animated bounceIn");


            setTimeout(function () {
                    question.removeClass("bounceIn");
                    question.removeClass("animated");
                    spm.removeClass("animated");
                    spm.removeClass("bounceIn");
                    spm.css("disabled","");
                }, 500);


            });
        },

        quizClick: function(e){
            var react = this;
            var cssId=$("#"+e.target.id);
            var spm=$(".spm");
            var question=$(".questionTitle");
            if((cssId.css("disabled") === "disabled"
             || spm.css("disabled") === "disabled")){
                return void 0;
            }
            //console.log(e.target.name);
            //console.log(e.target.id);

                    cssId.css("disabled","disabled");
                    spm.css("disabled","disabled");
                    cssId.addClass("animated bounceOut");
                    //spm.css("opacity",0.5);
                    setTimeout(function () {
                        cssId.css("opacity",0);
                        spm.addClass("animated bounceOut");
                    }, 500);

                    setTimeout(function () {
                        spm.css("opacity",0);
                        cssId.removeClass("animated bounceOut");
                        spm.removeClass("animated bounceOut");
                        question.addClass("animated bounceOut");

                    }, 750);

                    setTimeout(function () {
                        question.css("opacity",0);
                        question.removeClass("animated bounceOut");
                    }, 1250);

                    setTimeout(function () {
                       react.getQuizFromApi(2);
                    }, 1500);
        },

        componentDidMount: function(){
            this.getQuizFromApi(1);
        },

        render: function() {
            var react = this;
            $('.spm').click(function(){
                var question=($(this).parent().attr("value"));
                var answer=($(this).attr("key"));
                react.registerAnswer(question,answer)

            });

            var padding={
                padding:'5px'
            };

            var input={
                wordBreak: 'break-all'
            };



            return (
                <div >
                <section>
                    <h1>
                        <span className="timer">15:00</span>
                        <span className="points">0</span>
                        <span className="title">Quiz</span>
                    </h1>
                    <div className="quizhead">
                        <h3 className="questionTitle rainbow">
                            {this.state.question}
                            <pre><code data-language={this.state.programmingLanguage}>{this.state.code}</code></pre>
                        </h3>
                    </div>
                    <div>
                    <ul className="quiz" value="spørsmål 1">
                        <li value="1" style={padding}>
                            <input onClick={this.quizClick} id="answer1"  name="answer1" className="quizQuestion spm" style={input} type="button" key="1" value={this.state.answer1} />
                            </li>
                        <li value="2" style={padding}>
                            <input onClick={this.quizClick} id="answer2"  name="answer2" className="quizQuestion spm" style={input} type="button" key="2" value={this.state.answer2} />
                            </li>
                        <li value="3" style={padding}>
                            <input onClick={this.quizClick} id="answer3"  name="answer3" className="quizQuestion spm" style={input} type="button" key="3" value={this.state.answer3} />
                            </li>
                        <li value="4" style={padding}>
                            <input onClick={this.quizClick} id="answer4"  name="answer4" className="quizQuestion spm" style={input} type="button" key="4" value={this.state.answer4} />
                            </li>
                    </ul>
                    </div>
                </section>

                </div>
            )
        }
    });

module.exports = Quiz;
