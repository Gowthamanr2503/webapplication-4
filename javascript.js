const FOUR_HOURS_IN_MS = 4 * 60 * 60 * 1000;

let countDownDate = new Date().getTime() + FOUR_HOURS_IN_MS;

const interval = setInterval(() => {
    const now = new Date().getTime();
    const duration = countDownDate - now;

    if (duration < 0) {
        countDownDate = new Date().getTime() + FOUR_HOURS_IN_MS;
        updateDuration(FOUR_HOURS_IN_MS);
        return;
    }

    updateDuration(duration);
}, 1000);

function updateDuration(duration) {
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
}

const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

let countDownDate1 = new Date().getTime() + TWO_HOURS_IN_MS;

const interval1 = setInterval(() => {
    const now = new Date().getTime();
    const duration = countDownDate1 - now;

    if (duration < 0) {
        countDownDate1 = new Date().getTime() + TWO_HOURS_IN_MS;
        updateDuration1(TWO_HOURS_IN_MS);
        return;
    }

    updateDuration1(duration);
}, 1000);

function updateDuration1(duration) {
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    document.getElementById("hours1").innerHTML = String(hours).padStart(2, '0');
    document.getElementById("minutes1").innerHTML = String(minutes).padStart(2, '0');
    document.getElementById("seconds1").innerHTML = String(seconds).padStart(2, '0');
}


const ONE_HOURS_IN_MS = 1 * 60 * 60 * 1000;

let countDownDate2 = new Date().getTime() + ONE_HOURS_IN_MS;

const interval2 = setInterval(() => {
    const now = new Date().getTime();
    const duration = countDownDate2 - now;

    if (duration < 0) {
        countDownDate2 = new Date().getTime() + TWO_HOURS_IN_MS;
        updateDuration2(ONE_HOURS_IN_MS);
        return;
    }

    updateDuration2(duration);
}, 1000);

function updateDuration2(duration) {
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    document.getElementById("hours2").innerHTML = String(hours).padStart(2, '0');
    document.getElementById("minutes2").innerHTML = String(minutes).padStart(2, '0');
    document.getElementById("seconds2").innerHTML = String(seconds).padStart(2, '0');
}

document.getElementById('cameraInput').addEventListener('change', function(event) {
    const files = event.target.files;
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.id = 'capturedImage';
            document.getElementById('gallery').appendChild(img);
        };
        
        reader.readAsDataURL(file);
    }
});

document.getElementById('saveButton').addEventListener('click', function() {
    const name = document.getElementById('imageName').value;
    const imgElement = document.getElementById('capturedImage');
    
    if (name && imgElement) {
        const imgSrc = imgElement.src;

        // Retrieve existing images from localStorage
        const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

        // Create a data object
        const imageData = {
            name: name,
            image: imgSrc
        };

        // Add new image data to saved images
        savedImages.push(imageData);

        // Save updated images to localStorage
        localStorage.setItem('savedImages', JSON.stringify(savedImages));

        // Display saved message
        alert('Image and name saved!');

        // Clear the form
        document.getElementById('imageName').value = '';
        document.getElementById('gallery').innerHTML = '';

        // Load saved images
        loadSavedImages();
    } else {
        alert('Please capture an image and enter a name.');
    }
});

function loadSavedImages() {
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    savedImages.forEach((imageData, index) => {
        const container = document.createElement('div');
        container.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = imageData.image;

        const name = document.createElement('p');
        name.textContent = imageData.name;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'X';
        deleteButton.onclick = function() {
            deleteImage(index);
        };

        container.appendChild(img);
        container.appendChild(name);
        container.appendChild(deleteButton);
        gallery.appendChild(container);
    });
}

function deleteImage(index) {
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    savedImages.splice(index, 1);
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
    loadSavedImages();
}

// Load saved images on page load
window.onload = loadSavedImages;