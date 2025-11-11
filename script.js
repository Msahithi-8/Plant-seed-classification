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

  // Dummy data (fake but realistic)
  const seeds = [
    {
      name: "Wheat",
      color: "Golden Brown",
      size: "Medium",
      germination: "92%",
      nutrient: "High Protein",
      soil: "Loamy Soil",
      temperature: "15°C–25°C",
      quality: "Excellent",
      moisture: "10.5%",
      type: "Hybrid",
      yield: "35 quintals/acre",
      use: "Ideal for commercial farming"
    },
    {
      name: "Rice",
      color: "Light Yellow",
      size: "Small",
      germination: "88%",
      nutrient: "Rich in Starch",
      soil: "Clayey Soil",
      temperature: "25°C–35°C",
      quality: "Good",
      moisture: "12.1%",
      type: "Organic",
      yield: "40 quintals/acre",
      use: "Recommended for paddy cultivation"
    },
    {
      name: "Corn",
      color: "Yellow",
      size: "Large",
      germination: "90%",
      nutrient: "Carbohydrate Rich",
      soil: "Sandy Loam",
      temperature: "20°C–30°C",
      quality: "Excellent",
      moisture: "9.8%",
      type: "Hybrid",
      yield: "30 quintals/acre",
      use: "Suitable for food and feed"
    },
    {
      name: "Barley",
      color: "Light Brown",
      size: "Medium",
      germination: "85%",
      nutrient: "High Fiber",
      soil: "Well-drained Loam",
      temperature: "12°C–22°C",
      quality: "Average",
      moisture: "11.4%",
      type: "Local",
      yield: "25 quintals/acre",
      use: "Good for brewing and fodder"
    },
    {
      name: "Mustard",
      color: "Black",
      size: "Tiny",
      germination: "93%",
      nutrient: "Oil-rich",
      soil: "Sandy Loam",
      temperature: "18°C–27°C",
      quality: "Excellent",
      moisture: "10.1%",
      type: "Hybrid",
      yield: "12 quintals/acre",
      use: "Ideal for oil extraction"
    }
  ];

  // Pick random seed details
  const seed = seeds[Math.floor(Math.random() * seeds.length)];

  // Display results
  document.getElementById('result').innerHTML = `
    <h2>🌾 Seed Quality Report</h2>
    <p><strong>Seed Name:</strong> ${seed.name}</p>
    <p><strong>Quality:</strong> ${seed.quality}</p>
    <p><strong>Color:</strong> ${seed.color}</p>
    <p><strong>Size:</strong> ${seed.size}</p>
    <p><strong>Type:</strong> ${seed.type}</p>
    <p><strong>Moisture Level:</strong> ${seed.moisture}</p>
    <p><strong>Germination Rate:</strong> ${seed.germination}</p>
    <p><strong>Nutrient Content:</strong> ${seed.nutrient}</p>
    <p><strong>Soil Type:</strong> ${seed.soil}</p>
    <p><strong>Temperature Range:</strong> ${seed.temperature}</p>
    <p><strong>Expected Yield:</strong> ${seed.yield}</p>
    <p><strong>Recommended Use:</strong> ${seed.use}</p>
  `;
  resultSection.classList.remove('hidden');
} 
