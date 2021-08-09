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
    colorstatus(strength);
    
}

function colorstatus(strength){
    if(strength > 0 && strength <= 20){
        settingColor("#d00000");
        settingStatus("Very weak");
    }
    if(strength > 20 && strength <=40){
        settingColor("#e85d04");
        settingStatus("Weak");
    }
    if(strength > 40 && strength <=60){
        settingColor("#ffba08");
        settingStatus("Medium");
    }
    if(strength > 60 && strength <=80){
        settingColor("#32ae55");
        settingStatus("Strong");
    }
    if(strength > 80 && strength <=100){
        settingColor("#00FF00");
        settingStatus("Very Strong");
    }
}

function settingStatus(status){
    const statusEle = document.createElement("div");
    statusEle.innerHTML = status;
    statusEle.classList.add("strength")
    statusSection.appendChild(statusEle);
}

function settingColor(color){
    strengthMeter.style.setProperty("--color"  , color);
}

function calculateStrength(password){
    let weaknesses = [];
    weaknesses.push(lengthWeakness(password));
    weaknesses.push(lowercaseWeakness(password));
    weaknesses.push(uppercaseWeakness(password)); 
    weaknesses.push(specialCharWeakness(password)); 
    weaknesses.push(repeatingCharWeakness(password));
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

function lowercaseWeakness(password){
   return characterWeakness(password , /[a-z]/g , "lowercase");
}

function characterWeakness(password , regex , type){
    const matches = password.match(regex) || [];
    if(matches.length === 0){
        return {
            message : `There are no ${type} characters`,
            deduction : 20
        }
    }
    if(matches.length <= 2){
        return {
            message : `Your password could use more ${type} characters`,
            deduction : 5 
        }
    }
}
function uppercaseWeakness(password){
    return characterWeakness(password , /[A-Z]/g , "uppercase");
}

function specialCharWeakness(password){
    return characterWeakness(password , /[^a-zA-Z0-9]/g , "special")
}

function repeatingCharWeakness(password){
    const matches = password.match(/(.)\1/g) || [];
    if(matches.length > 0){
        return {
            message : "Your password has repeating characters",
            deduction : matches.length * 10
        }
    }
}