/** @jsx React.DOM */

'use strict';

var React = require('react'),

    Quiz = React.createClass({

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
            this.answers.push(answer);
            $(".spm").css("opacity",0.5);
            $(".spm").attr("disabled", "disabled");
        },

        getQuizFromApi: function(id, h1) {
        $.getJSON( "http://api.robbestad.com/programmingquiz/"+id, function( data ) {
                console.log(data);
                //data.language='php';
                //var q = data.question.replace("[code]", "<pre><code data-language=\""+data.language+"\">");
                //q = q.replace("[/code]","</code></pre>");
                //h1.innerHTML=q;
                //Rainbow.color($(".questionTitle"));
                //return data.question;
            });
        },

        componentDidMount: function(){
            this.getQuizFromApi(1,$("h1.questionTitle")[0]);
        },

        render: function() {
            $('.spm').click(function(){
                var question=($(this).parent().attr("value"));
                var answer=($(this).attr("key"));
                this.registerAnswer(question,answer)

                // UI
                $(this).addClass("animate bounceOut").delay(750).queue(function(){
                    $(this).css("opacity",0);
                    $(".spm").css("opacity",1);
                });
            });


            return (
                <div className="Quiz">
                    <h1>Quiz</h1>

                    <div className="quizhead">
                        <h1 className="questionTitle">Question 1</h1>
                    </div>
                    <ul className="quiz" value="spørsmål 1">
                        <li value="1" >
                            <input className="a spm" type="button" key="1" value="Svar 1" />
                            </li>
                        <li value="2" >
                            <input className="a spm" type="button" key="2" value="Svar 2" />
                            </li>
                        <li value="3" >
                            <input className="a spm" type="button" key="3" value="Svar 3" />
                            </li>
                        <li value="4" >
                            <input className="a spm" type="button" key="4" value="Svar 4" />
                            </li>
                    </ul>
                </div>
            )
        }
    });

module.exports = Quiz;
