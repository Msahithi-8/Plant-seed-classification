              function analyzeSeed() {
  const fileInput = document.getElementById('seedImage');
  const previewDiv = document.getElementById('preview');
  const resultDiv = document.getElementById('result');

  if (!fileInput.files.length) {
    alert("Please select a seed image!");
    return;
  }

  const file = fileInput.files[0];

  // Show uploaded image
  previewDiv.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Seed Image">`;

  // Dummy seed quality report
  const report = {
    "Color Uniformity": "High",
    "Shape Ratio": "High",
    "Size Consistency": "Medium",
    "Texture Smoothness": "High",
    "Edge Sharpness": "High",
    "Defect Detection": "Medium",
    "Brightness / Luster": "High"
  };

  // Display report with simple bars
  let html = `<h2>🌾 Seed Quality Report</h2>`;
  html += `<table style="margin:auto; border-collapse: collapse;">`;
  html += `<tr><th style="text-align:left; padding:5px;">Parameter</th><th style="text-align:left; padding:5px;">Grade</th><th style="padding:5px;">Graph</th></tr>`;

  for (let param in report) {
    let grade = report[param];
    let value = 0;
    if (grade === "High") value = 100;
    else if (grade === "Medium") value = 70;
    else value = 40;

    html += `<tr>
      <td style="padding:5px;">${param}</td>
      <td style="padding:5px;">${grade}</td>
      <td style="padding:5px;">
        <div style="width:100px; background:#eee; height:15px; border-radius:5px;">
          <div style="width:${value}%; background:#4caf50; height:15px; border-radius:5px;"></div>
        </div>
      </td>
    </tr>`;
  }

  html += `</table>`;

  resultDiv.innerHTML = html;
              }
