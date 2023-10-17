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
    

    try {
        sendDataLoad(true)
        
        let dataUsers = await fetch("https://api.github.com/gists/60ce6720500d33f635ae5b28b690568c"),
            dataUsersJson = await dataUsers.json()
        console.log(dataUsersJson)

        if(!dataUsers.ok) throw {status: dataUsers.status, statusText: dataUsers.statusText}

        let verify = 0

        dataUsersJson.forEach(element => {
            if(element.user === $user.value && element.password === $pass.value){
                verify++
            }
        })

        if(verify === 1){
            window.open("../src/dashboard.html", "_self")
        }else{
            alert("Verifique los datos de inicio de sesión")
        }

        sendDataLoad(false)
    } catch (error) {
        console.log(error)
    }

    
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