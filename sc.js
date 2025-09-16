let steps = [];
let currentStep = 0;
let resultValue= null;

window.onload = function () {
  document.querySelector(".next").disabled = true;
  document.querySelector(".reset").disabled = true;
};

function start() {
  const op = document.getElementById("operation").value;
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const stepsDiv = document.getElementById("steps");
  const resultDiv = document.getElementById("result");

  stepsDiv.innerHTML = "";
  resultDiv.innerHTML = "Output :";
  steps = [];
  currentStep = 0;

  if (!op || isNaN(num1) || isNaN(num2)) {
    alert("Please select an operation and enter both numbers.");
    return;
  }

  document.querySelector(".start").disabled = true;
  document.querySelector(".next").disabled = false;
  document.querySelector(".reset").disabled = false;

  switch (op) {
    case "add":
      steps.push(`a=int(input('Enter a number'))`);
      steps.push(`b=int(input('Enter a number'))`);
      steps.push(`c=a+b`);
      steps.push(`print("The addition is: ",c)`);
      resultValue=num1+num2;
      break;
    case "subtract":
      steps.push(`a=int(input('Enter a number'))`);
      steps.push(`b=int(input('Enter a number'))`);
      steps.push(`c=a-b`);
      steps.push(`print("The subtraction is: ",c)`);
      resultValue=num1-num2;
      break;
    case "multiply":
      steps.push(`a=int(input('Enter a number'))`);
      steps.push(`b=int(input('Enter a number'))`);
      steps.push(`c=a*b`);
      steps.push(`print("The multiplication is: ",c)`);
      resultValue = num1*num2;
      break;
    case "divide":
      steps.push(`a = int(input('Enter a number'))`);
      steps.push(`b = int(input('Enter a number'))`);
      steps.push(`c = a / b`);

      if (num2 === 0) {
      steps.push(`print("Cannot divide by zero")`);
      resultValue = "undefined"; // Optional, won't be used
  } else {
    steps.push(`print("The division is:", c)`);
    resultValue = num1 / num2;
  }
  break;
      
  }

  // Display all steps
  stepsDiv.innerHTML = steps
    .map((step, i) => `<p id="step-${i}">${step}</p>`)
    .join("");
}

function nextStep() {
  if (currentStep < steps.length) {
    // Un-highlight previous step
    const prevStep = document.getElementById(`step-${currentStep - 1}`);
    if (prevStep) prevStep.style.backgroundColor = "";

    // Highlight current step
    const step = document.getElementById(`step-${currentStep}`);
    step.style.backgroundColor = "lightyellow";
    
    
    if (currentStep === steps.length - 1) {
  const lastStep = step.textContent.trim();

  if (lastStep.includes("Cannot divide by zero")) {
    alert("Division by zero is not allowed.");
    document.getElementById("result").textContent = "Output : Cannot divide by zero";
  }

  else if (lastStep.startsWith("print(") && lastStep.endsWith(")")) {
    const innerContent = lastStep.substring(
      lastStep.indexOf("(") + 1,
      lastStep.lastIndexOf(")")
    );

    let cleaned = innerContent.replace(/['"]/g, "").replace(/,/g, "");
    cleaned = cleaned.replace(/c(?!.*c)/, resultValue);
    document.getElementById("result").textContent = "Output : " + cleaned.trim();
  }
}

    // Handle last step for result panel
    if (currentStep === steps.length - 1) {
      const lastStep = step.textContent.trim();

      if (lastStep.startsWith("print(") && lastStep.endsWith(")")) {
        // Extract content inside print(...)
        const innerContent = lastStep.substring(
          lastStep.indexOf("(") + 1,
          lastStep.lastIndexOf(")")
        );

        // Remove quotes and commas
        let cleaned = innerContent.replace(/['"]/g, "").replace(/,/g, "");

        // Replace only the last occurrence of 'c' with the actual result
        cleaned = cleaned.replace(/c(?!.*c)/, resultValue);

        // Show the clean output
        document.getElementById("result").textContent =
          "Output : " + cleaned.trim();
      }
    }

    currentStep++;
  }
  else{
    alert("Program Completed.");
  }
}

function reset() {
  document.getElementById("operation").selectedIndex=0;
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("steps").innerHTML = "";
  document.getElementById("result").textContent = "Output :";
  document.querySelector(".start").disabled = false;
  steps = [];
  currentStep = 0;
  resultValue= null;
}