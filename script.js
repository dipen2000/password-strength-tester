const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const statusSection = document.getElementById("status");
const reasonSection = document.getElementById("reasons");
updateStrengthBar()
passwordInput.addEventListener("input" ,updateStrengthBar);

function updateStrengthBar(){
    let strength = 100;
    reasonSection.innerHTML = '';
    statusSection.innerHTML = '';
    const weaknessArr = calculateStrength(passwordInput.value);
    weaknessArr.forEach(weakness => {
        if(weakness == null){
            strengthMeter.style.setProperty("--strength" , strength)    
            return;
        }
        strength -= weakness.deduction;
        strengthMeter.style.setProperty("--strength" ,strength );
        const reason = document.createElement("div");
        reason.innerHTML = weakness.message;
        reason.classList.add("reason");
        reasonSection.appendChild(reason);

    })
    if(strength <= 85 && strength >=75){
        const status = document.createElement("div");
        status.innerHTML = "Strong";
        status.classList.add("strength");
        statusSection.appendChild(status);
    }
    
}

function calculateStrength(password){
    let weaknesses = [];
    weaknesses.push(lengthWeakness(password));
    return weaknesses;
}

function lengthWeakness(password){
    const length = password.length;
    if(length <= 5){
        return {
            message : "Your password is too short!",
            deduction : 40
        }
    }
    if(length <= 10){
        return {
            message : "Your password could be more longer!",
            deduction : 15
        }
    }
}