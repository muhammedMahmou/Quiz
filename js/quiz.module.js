export class Quiz {
    constructor(result,totalQuestions){
        this.result=result
        this.totalQuestions=totalQuestions
        this.index=0
        this.score=0
        this.current=document.getElementById("current")
        this.total=document.getElementById("total")
        this.correct=document.getElementById("correct")
        this.Incorrect=document.getElementById("Incorrect")
        this.question=document.getElementById("question")
        this.rowAnswer=document.getElementById("rowAnswer")
        this.nextQuestion=document.getElementById("nextQuestion").addEventListener("click",()=>{this.checkAns()})
        this.showResults()
    }
    showResults(){
     this.current.innerHTML=this.index+1
     this.total.innerHTML=this.totalQuestions
     this.question.innerHTML=this.result[this.index].question
     let ansRow = [this.result[this.index].correct_answer,...this.result[this.index].incorrect_answers]
     let newAns = this.randomArray(ansRow)
     this.displayAnswers(newAns)
    }
    displayAnswers(ans){
        let temp=``
        for (let i = 0; i < ans.length; i++) {
           temp+=`<div class="form-check">
           <label class="form-check-label">
               <input type="radio" class="form-check-input" name="answer" id="${i}" value="${ans[i]}">
               "${ans[i]}
           </label>
       </div>`
        }
        document.getElementById("rowAnswer").innerHTML=temp
    }
    randomArray(array){
        let ranNums = [],
        i = array.length,
        j = 0;  
        while (i--) {
        j = Math.floor(Math.random() * (i+1));
        ranNums.push(array[j]);
        array.splice(j,1);
        }
        return ranNums
        }
        checkAns(){
            let alert = document.getElementById("alert2")
            let choice =Array.from( document.getElementsByName("answer"));
            choice = choice.filter(function (e) { return e.checked})
            if (choice.length>0) {
                alert.classList.replace("d-block","d-none")
            if (choice[0].value==this.result[this.index].correct_answer) {
                this.correct.classList.replace("d-none","d-fixed")
                this.Incorrect.classList.replace("d-fixed","d-none")
                this.score++
            }
            else{
                this.Incorrect.classList.replace("d-none","d-fixed")
                this.correct.classList.replace("d-fixed","d-none")
            }
           
            this.nextQuestions()
            }
            else{
                alert.classList.remove("d-none")
            }
        }
        nextQuestions(){
            this.index++
            (this.index < this.totalQuestions)?this.showResults() : this.finish()
        }
        finish(){
            let quiz = document.getElementById("quiz")
            let finish = document.getElementById("finish")
            quiz.classList.replace("d-block","d-none")
            finish.classList.replace("d-none","d-block")
            this.showScore()
        }
        showScore(){
            let quizScore= document.getElementById("score")
            quizScore.innerText=this.score
        }
}
    