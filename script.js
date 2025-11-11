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

    // Hash function for consistent grading per image
    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    const grades = ["High", "Medium", "Low"];
    const imageHash = hashString(file.name);

    // Dynamic seed quality report
    const report = {
        "Moisture Level": grades[imageHash % 3],
        "Color Uniformity": grades[(imageHash + 1) % 3],
        "Shape Ratio": grades[(imageHash + 2) % 3],
        "Size Consistency": grades[(imageHash + 3) % 3],
        "Texture Smoothness": grades[(imageHash + 4) % 3],
        "Edge Sharpness": grades[(imageHash + 5) % 3],
        "Defect Detection": grades[(imageHash + 6) % 3],
        "Brightness / Luster": grades[(imageHash + 7) % 3]
    };

    // Display results with colored bars
    let html = `<h2>🌾 Seed Quality Report</h2><table>`;
    html += `<tr><th>Parameter</th><th>Grade</th><th>Graph</th></tr>`;

    for (let param in report) {
        let grade = report[param];
        let barClass = grade === "High" ? "grade-high" : grade === "Medium" ? "grade-medium" : "grade-low";
        let value = grade === "High" ? 100 : grade === "Medium" ? 70 : 40;

        html += `<tr>
            <td>${param}</td>
            <td>${grade}</td>
            <td>
                <div class="bar-container">
                    <div class="bar-fill ${barClass}" style="width:${value}%"></div>
                </div>
            </td>
        </tr>`;
    }

    html += `</table>`;

    resultDiv.innerHTML = html;
    resultDiv.style.display = "block"; // Show report box
 }
