const savedCredentials = JSON.parse(localStorage.getItem("database")) || [];

const createAccount = () =>{
    let userName = document.getElementById("signup-name").value
    let userEmail = document.getElementById("signup-email").value
    let userPassword = document.getElementById("signup-password").value
    let userPasswordConfirmed = document.getElementById("signup-confirm-password").value // Basic DOM that retrieves ids and assigns them to variables 


// TRYING TO WRITE A FUNCTION THAT CHECKS FOR IF THE LOGIN CREDENTIALS IS ALREADY PRESENT
    const checkDatabase = () =>{
        for(let i=0; i<savedCredentials.length; i++){
            if (userEmail === savedCredentials[i].userEmail && userName === savedCredentials[i].userName){
                alert("Username or Email taken")
                return true
            } 
        }
        return false
    }

    //REMEBER THAT IN ORDER FOR THE OBJECTS TO RECIEVE THE VALUES FROM THE FORM THEY MUST BE PUT IN THE FUNCTION SO THEY CAN BE UPDATED
    let credentials = {userName, userEmail, userPassword, userPasswordConfirmed} // This stores the variables in an object called Credentials
    
    if(userName.trim() === "" || userEmail.trim() === "" || userPassword.trim() ==="" || userPasswordConfirmed.trim() ===""){ // This is a conditional statment that checks each value if it is true and if one is true it returns true and runs the command which in this case is an alert
        alert("Please fill in all the inputs") //                       Alert to fill input will change to innerhtml stuff later sha
    } else { //                                  This is the else statment so it runs the normal command but i added a nested condtitional
        if (userPassword.trim() === userPasswordConfirmed){                  // This is a nested conditional statment to check if the original password is the same as the confirmed password

            
            if (!checkDatabase(false)){
                savedCredentials.push(credentials) // Pushes new Objects to the back of the array
                localStorage.setItem("database", JSON.stringify(savedCredentials)) // This line saves the updated array as a string 
                console.log(credentials);
                // This is for a smooth animation and loading button
                document.getElementById("signup-submit-button").innerHTML = `<span class="loader"></span> Creating account...`;
                setTimeout(() => {
                document.body.classList.add("page-exit");
                }, 1100);
                setTimeout(() => {
                window.location.href = "signin.html";
                }, 1500);
            }
            
            
        } else { // If they are not the same it alerts the user
            alert("Confirm password is wrong")
        }
    }

    document.getElementById("signup-name").value = ""
    document.getElementById("signup-email").value = ""
    document.getElementById("signup-password").value = ""
    document.getElementById("signup-confirm-password").value = "" // These lines are to clear the inputs after the function is run
} 


let submit = document.getElementById("signup-submit-button")

submit?.addEventListener("click", function(){
    event.preventDefault()
    createAccount()
    
})

console.log(savedCredentials);

let signInButton = document.getElementById("signin-submit-button")

signInButton?.addEventListener("click",function(){
    event.preventDefault()
    verfifylogIn()
})


const verfifylogIn = () =>{
    let userEmail = document.getElementById("signin-email").value
    let userPassword = document.getElementById("signin-password").value    
    let isValid = checkDatabaseLogin(userEmail, userPassword)
    if (isValid) {     
        document.getElementById("signin-submit-button").innerHTML = `<span class="loader"></span> Logging you in...`;
                    setTimeout(() => {
                    document.body.classList.add("page-exit");
                    }, 1100);
                    setTimeout(() => {
                    window.location.href = "../index.html";
                    }, 1500);

    } 
}

const checkDatabaseLogin = (userEmail, userPassword) =>{
        for(let i=0; i<savedCredentials.length; i++){
            if (userEmail === savedCredentials[i].userEmail && userPassword === savedCredentials[i].userPassword){
                alert("Login sucessful")
                return true
            }  
        } alert ("Incorrect Email or Password") 
        return false
    }