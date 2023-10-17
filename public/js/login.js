const $user = document.querySelector("#user"),
        $pass = document.querySelector("#pass"),
        $bLogin = document.querySelector("#bLogin")


function sendDataLoad(value){
    $user.disabled = value
    $pass.disabled = value
    $bLogin.disabled = value
    if(value){
        
    }
}

async function login(){
    

    window.open(",,/dashboard.html", "_self")

    
}


document.addEventListener("click",async event => {
    if(event.target.matches("#panelLogin button *") || event.target.matches("#panelLogin button")){
        login()
    }
})

document.addEventListener("keypress", async event => {
    if(event.target.matches("#panelLogin #pass") && event.key === "Enter"){
        login()
    }
})