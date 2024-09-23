// Create a new SpeechSynthesisUtterance object to handle speech synthesis
let speech = new SpeechSynthesisUtterance();

// Initialize an array to hold available voices
let voices = [];

// Select the dropdown element for voice selection
let voiceSelect = document.querySelector("select");

// Listen for changes in available voices
window.speechSynthesis.onvoiceschanged = () => {
    
    voices = window.speechSynthesis.getVoices(); // Load the available voices from the system into the voices array
    
    speech.voice = voices[0];  // Assign a default voice to the speech object (the first voice in the array)
    
    // Populate the voice selection dropdown with the available voices
    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i); // Create a new option element for each voice and add it to the dropdown
    });
}

// Add an event listener for when the user selects a voice from the dropdown
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value]; // Update the speech.voice property with the selected voice
});

// Add an event listener for the button to trigger speech synthesis
document.querySelector("button").addEventListener("click", () => {
    
    speech.text = document.querySelector("textarea").value; // Set the text to be spoken from the textarea's value

    window.speechSynthesis.speak(speech); // play the written text in textarea
});


// Add an event listener for the file input to read the text file
        document.getElementById('fileInput').addEventListener('change', (textFile) => {
            const file = textFile.target.files[0]; // Get the selected file
            if (file) {
                const reader = new FileReader(); // Create a new FileReader instance
                reader.onload = function(e) {
                    document.querySelector("textarea").value = e.target.result; // Set the textarea's value to the file's content
                };
                reader.readAsText(file); // Read the file as text
            }
        });