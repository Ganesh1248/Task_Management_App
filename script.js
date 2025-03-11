document.getElementById("addTask").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Add dynamic effect to the container when the page loads
window.addEventListener("load", function() {
    const container = document.querySelector(".container");
    container.style.opacity = "0";
    container.style.transform = "scale(0.9)";
    setTimeout(() => {
        container.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
        container.style.opacity = "1";
        container.style.transform = "scale(1.1)";
    }, 100);
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    let taskDate = document.getElementById("taskDate").value;
    
    if (taskText === "") return;

    let startTime = new Date();
    let formattedTime = startTime.toLocaleTimeString();

    if (!taskDate) {
        taskDate = startTime.toISOString().split('T')[0];
    }

    let li = document.createElement("li");
    let taskContent = document.createElement("span");
    taskContent.innerHTML = `${taskText} <small style="color:gray;">(Due: ${taskDate} at ${formattedTime})</small>`;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");


    deleteBtn.addEventListener("click", function() {
        let endTime = new Date();
        let totalTime = ((endTime - startTime) / 1000).toFixed(2);
        showAlert(`Task "${taskText}" completed in ${totalTime} seconds.`);
        document.getElementById("taskList").removeChild(li);
    });

    li.appendChild(taskContent);
    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";
    document.getElementById("taskDate").value = "";
}

function showAlert(message) {
    let alertBox = document.getElementById("alertBox");
    if (!alertBox) {
        alertBox = document.createElement("div");
        alertBox.id = "alertBox";
        alertBox.className = "alert-box";
        document.body.appendChild(alertBox);
    }
    alertBox.innerHTML = `<div class='alert-card'>${message}</div>`;
    alertBox.classList.remove("hidden");

    setTimeout(() => {
        alertBox.classList.add("hidden");
    }, 3000);
}

document.getElementById("startApp").addEventListener("click", function() {
    let userName = document.getElementById("userNameInput").value.trim();

    if (userName === "") {
        alert("Please enter your name!");
        return;
    }

    // Hide welcome screen with transition effect
    let welcomeScreen = document.querySelector(".welcome-screen");
    welcomeScreen.classList.add("hidden");

    // Show main app container
    let appContainer = document.querySelector(".app-container");
    appContainer.classList.remove("hidden");

    // Display welcome message
    document.getElementById("welcomeMessage").textContent = `Welcome, ${userName}!`;
});

