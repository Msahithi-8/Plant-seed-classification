function analyzeSeed() {
  const fileInput = document.getElementById('seedImage');
  const resultSection = document.getElementById('result');
  const previewDiv = document.getElementById('preview');

  if (!fileInput.files.length) {
    alert('Please select an image first!');
    return;
  }

  // Show uploaded image preview
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    previewDiv.innerHTML = `<img src="${e.target.result}" alt="Seed Image">`;
  };
  reader.readAsDataURL(file);

  // Dummy data (fake results)
  const seeds = ["Wheat", "Rice", "Corn", "Barley", "Mustard"];
  const qualities = ["Excellent", "Good", "Average", "Poor"];
  const uses = [
    "Ideal for farming",
    "Suitable for research",
    "Use for seed improvement",
    "Not recommended for cultivation"
  ];

  // Random selection
  const seedName = seeds[Math.floor(Math.random() * seeds.length)];
  const quality = qualities[Math.floor(Math.random() * qualities.length)];
  const moisture = (Math.random() * (15 - 8) + 8).toFixed(1) + "%";
  const use = uses[Math.floor(Math.random() * uses.length)];

  // Display results
  document.getElementById('seedName').textContent = seedName;
  document.getElementById('quality').textContent = quality;
  document.getElementById('moisture').textContent = moisture;
  document.getElementById('use').textContent = use;
  resultSection.classList.remove('hidden');
}
