import { Quiz } from "./quiz.module.js"
export class Settings{
    constructor(){
        this.category=document.getElementById("category")
        this.difficulty=Array.from(document.getElementsByName("difficulty"))
        this.number=document.getElementById("number")
        this.start=document.getElementById("start").addEventListener("click",()=>{this.getQuiz()})
    }
    async getQuiz(){
        let quiz=document.getElementById("quiz")
        let settings = document.getElementById("settings")
        let alert = document.getElementById("alert")
        let category = this.category.value
        let difficulty =this.difficulty.filter((e)=>e.checked)
        let totalQuestions=this.number.value
        let result = await this.fetchApi(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty[0].value}&type=multiple`)
        if (result.length > 0) {
            settings.classList.replace("d-block","d-none")
            quiz.classList.replace("d-none","d-block")
            new Quiz(result,totalQuestions)
        }
        else{
            alert.classList.remove("d-none")
        }
    }
    async fetchApi(url){
        let response = await fetch(url)
        let myData = await response.json()
        return myData.results
    }
}
// 