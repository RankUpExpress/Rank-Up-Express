const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const srRange = document.getElementById('srRange');
const priceSpan = document.getElementById('price');

// Function to calculate price based on SR
function calculatePrice(srFrom, srTo) {
    let basePrice = 0.01; // Base price per SR
    let totalPrice = 0;

    for (let i = srFrom; i < srTo; i += 100) {
        let range = Math.min(100, srTo - i);
        totalPrice += basePrice * range;
        basePrice += 0.01; // Increment price per SR for higher ranges
    }

    return totalPrice.toFixed(2);
}

// Function to update values and synchronize
function updateValues() {
    let srFrom = parseInt(slider1.value);
    let srTo = parseInt(slider2.value);

    if (srFrom > srTo) {
        // Swap values if necessary
        [srFrom, srTo] = [srTo, srFrom];
        slider1.value = srFrom;
        slider2.value = srTo;
    }

    input1.value = srFrom;
    input2.value = srTo;
    srRange.textContent = `${srFrom} - ${srTo}`;
    priceSpan.textContent = calculatePrice(srFrom, srTo);
}

// Event listeners for sliders
slider1.addEventListener('input', updateValues);
slider2.addEventListener('input', updateValues);

// Event listeners for inputs
input1.addEventListener('input', function() {
    let value = Math.min(Math.max(parseInt(this.value), 0), 10000);
    slider1.value = value;
    updateValues();
});
input2.addEventListener('input', function() {
    let value = Math.min(Math.max(parseInt(this.value), 0), 10000);
    slider2.value = value;
    updateValues();
});

// Initialize sliders to opposite ends
slider1.value = 0;
slider2.value = 10000;
input1.value = 0;
input2.value = 10000;
updateValues();
