/** @jsx React.DOM */

'use strict';
var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};
var React = require('react'),

    Quiz = React.createClass({
        mixins: [SetIntervalMixin], // Use the mixin

        getInitialState: function(){
            return {
                question:"",
                answer1:"",
                answer2:"",
                answer3:"",
                answer4:"",
                answer5:"",
                correct:"",
                programmingLanguage:"",
                code:"",
                points:0,
                timeLimit:(15*60),
                countdown:(15*60),
                lastWin:false,
                winStreak:false,
                questions:[1,2,3,4,5,6,7,8,9,10],
                timeBonus: 0,
                quizFinished:false,
                correct_answers:0,
                wrong_answers:0
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
            var state = react.state;
            state.question=data.question;
            state.code=data.code;
            state.programmingLanguage=data.programminglanguage;
            state.answer1=data.answer1;
            state.answer2=data.answer2;
            state.answer3=data.answer3;
            state.answer4=data.answer4;
            state.answer5=data.answer5;
            state.correct=data.correct_answers;
            react.replaceState(state);

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

            var state=react.state;
            var nextQuestion = state.questions.pop();


            if(e.target.name === this.state.correct){
                state.winStreak+=1;
                state.correct_answers+=1;
                state.points=state.points+(1*state.winStreak);
                react.replaceState(state);
            } else {
                state.lastWin=false;
                state.winStreak=0;
                state.wrong_answers+=1;

                react.replaceState(state);
            }


            if(undefined === nextQuestion || this.state.countdown <= 0){
                // quiz finished
                // time bonus
                var finishTime = this.state.timeLimit-this.state.countdown;
                state.timeBonus = (this.state.timeLimit / (this.state.timeLimit-finishTime));
                var ratio;
                if(this.state.wrong_answers === 0) ratio=1;
                else ratio = this.state.correct_answers/this.state.wrong_answers;
                state.points += Math.ceil((0.1 + ratio) * 10/state.timeBonus);
                state.quizFinished=true;
            }



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

            if(undefined === nextQuestion){
                // quiz finished
            } else {
            setTimeout(function () {
               react.getQuizFromApi(nextQuestion);
            }, 1500);
            }
        },

        shuffle: function(o){
                for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
        },

        componentDidMount: function(){
            var state = this.state;
            state.questions = this.shuffle(state.questions);
            var nextQuestion = state.questions.pop();
            this.setState(state);

            this.getQuizFromApi(nextQuestion);
            this.setInterval(this.tick, 1000); // Call a method on the mixin

        },
        tick: function(){
            if(!this.state.quizFinished){
                var state=this.state;
                state.countdown=state.countdown-1;
                this.replaceState(state);
            }
        },

        render: function() {
            var react = this;
            //$('.spm').click(function(){
            //    var question=($(this).parent().attr("value"));
            //    var answer=($(this).attr("key"));
            //    react.registerAnswer(question,answer)
            //
            //});

            var padding={
                padding:'5px'
            };
            var paddingTop={
                paddingTop:'10px'
            };


            var input={
                wordBreak: 'break-all'
            };

            //var hours = Math.floor(this.state.countdown / (60 * 60));
            //var minutes = Math.floor(this.state.countdown % (60 * 60) / 60);
            //var seconds = Math.ceil(this.state.countdown % (60 * 60) % 60);

            var secs=this.state.countdown;
            var hr = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600))/60);
            var sec = secs - (hr * 3600) - (min * 60);
            //if (hr < 10) {hr = "0" + hr; }
            if (min < 10) {min = "0" + min;}
            if (sec < 10) {sec = "0" + sec;}

            var assessment;
            if(this.state.wrong_answers === 0){
                assessment = "True Guru";
            } else {
                assessment=this.state.correct_answers/this.state.wrong_answers;

                if(assessment>1.5){
                    assessment="Master";
                }
                else if(assessment<0.2){
                    assessment="Do you even "+this.state.programmingLanguage+"?";
                }
                else if(assessment<0.5){
                    assessment="Apprentice";
                }
                else if(assessment<=1){
                    assessment="Journeyman";
                }
                else if(assessment<1.5){
                    assessment="Scholar";
                }
            }
            if(this.state.quizFinished){
                return(
                    <div style={paddingTop}>
                        <section>
                            <span className="quizinfo">
                            Each correct answers scores one point. Winning streaks are rewarded.
                            Additionally, completing the quiz faster earns you a time bonus.
                            </span>
                            <h1>
                                <span className="timer">{min}:{sec}</span>
                                <span className="points">{this.state.points}</span>
                                <span className="title">Quiz</span>
                            </h1>
                            <div>
                                <h2>Congratulations</h2>
                                <p>
                                You finished the quiz!
                                </p>
                                <p>
                                Your final score (+ time bonus): {this.state.points}<br/>
                                    <br/>
                                <strong>
                                 {this.state.programmingLanguage} ranking: {assessment}
                                </strong>
                                </p>
                            </div>
                        </section>
                    </div>
                );
            }
            else {

            return (
                <div style={paddingTop}>
                <section>
                    <span className="quizinfo">
                    Each correct answers scores one point. Winning streaks are rewarded.
                    Additionally, completing the quiz faster earns you a time bonus.
                    </span>
                    <h1>
                        <span className="timer">{min}:{sec}</span>
                        <span className="points">{this.state.points}</span>
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
                            <input onClick={this.quizClick} id="answer1"  name="1" className="quizQuestion spm" style={input} type="button" key="1" value={this.state.answer1} />
                            </li>
                        <li value="2" style={padding}>
                            <input onClick={this.quizClick} id="answer2"  name="2" className="quizQuestion spm" style={input} type="button" key="2" value={this.state.answer2} />
                            </li>
                        <li value="3" style={padding}>
                            <input onClick={this.quizClick} id="answer3"  name="3" className="quizQuestion spm" style={input} type="button" key="3" value={this.state.answer3} />
                            </li>
                        <li value="4" style={padding}>
                            <input onClick={this.quizClick} id="answer4"  name="4" className="quizQuestion spm" style={input} type="button" key="4" value={this.state.answer4} />
                            </li>
                    </ul>
                    </div>
                </section>

                </div>
            )
            }
        }
    });

module.exports = Quiz;
