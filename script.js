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

    // Hash function for consistent grading
    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    const grades = ["High", "Medium", "Low"];
    const gradeValues = { "High": 100, "Medium": 70, "Low": 40 };
    const imageHash = hashString(file.name);

    // Seed characteristics for radar chart
    const report = {
        "Moisture": grades[imageHash % 3],
        "Color": grades[(imageHash + 1) % 3],
        "Shape": grades[(imageHash + 2) % 3],
        "Size": grades[(imageHash + 3) % 3],
        "Texture": grades[(imageHash + 4) % 3],
        "Defects": grades[(imageHash + 5) % 3],
        "Brightness": grades[(imageHash + 6) % 3]
    };

    const labels = Object.keys(report);
    const dataValues = Object.values(report).map(grade => gradeValues[grade]);

    // Show result
    resultDiv.style.display = "block";

    // Create radar chart
    const ctx = document.getElementById('radarChart').getContext('2d');

    // Destroy previous chart if exists
    if (window.radarChartInstance) window.radarChartInstance.destroy();

    window.radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Seed Quality',
                data: dataValues,
                backgroundColor: 'rgba(76, 175, 80, 0.3)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(76, 175, 80, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: { stepSize: 20 }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            if (value === 100) return "High";
                            if (value === 70) return "Medium";
                            return "Low";
                        }
                    }
                }
            }
        }
    });
       }
