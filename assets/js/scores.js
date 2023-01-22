let highscores = document.querySelector("#highscores")
// getting and parsing data from localstorage
let data = JSON.parse(localStorage.getItem("user_initials"))

// sorrt data from localstorage from highest to lowest

if(data){
    data.sort((a, b) => b.score - a.score)
    // rendering scores
    data.forEach((data, index)=>{
        highscores.innerHTML += `<li>${data.name} - ${data.score}</li>`
    })
}

// clearing data from local storage

document.querySelector("#clear").addEventListener("click", ()=>{
    console.log("click")
    localStorage.clear()
    highscores.innerHTML = ""
})