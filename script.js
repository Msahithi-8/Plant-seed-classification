function analyzeSeeds() {
    const fileInput = document.getElementById('seedImages');
    const previewDiv = document.getElementById('preview');
    const resultDiv = document.getElementById('result');

    if (!fileInput.files.length) {
        alert("Please select at least one seed image!");
        return;
    }

    const files = Array.from(fileInput.files);

    // Show uploaded images
    previewDiv.innerHTML = files.map(f => `<img src="${URL.createObjectURL(f)}" alt="Seed Image">`).join('');

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
    const colors = ['rgba(76,175,80,0.5)', 'rgba(255,165,0,0.5)', 'rgba(33,150,243,0.5)'];
    const borderColors = ['rgba(76,175,80,1)', 'rgba(255,165,0,1)', 'rgba(33,150,243,1)'];

    const labels = ["Moisture", "Color", "Shape", "Size", "Texture", "Defects", "Brightness"];

    const datasets = files.map((file, index) => {
        const imageHash = hashString(file.name);
        const report = {
            "Moisture": grades[imageHash % 3],
            "Color": grades[(imageHash + 1) % 3],
            "Shape": grades[(imageHash + 2) % 3],
            "Size": grades[(imageHash + 3) % 3],
            "Texture": grades[(imageHash + 4) % 3],
            "Defects": grades[(imageHash + 5) % 3],
            "Brightness": grades[(imageHash + 6) % 3]
        };
        const dataValues = Object.values(report).map(grade => gradeValues[grade]);

        return {
            label: file.name,
            data: dataValues,
            backgroundColor: colors[index % colors.length],
            borderColor: borderColors[index % borderColors.length],
            borderWidth: 3,
            pointBackgroundColor: borderColors[index % borderColors.length],
            pointBorderColor: 'white',
            pointHoverRadius: 7
        };
    });

    resultDiv.style.display = "block";
    const ctx = document.getElementById('radarChart').getContext('2d');

    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    if (window.radarChartInstance) window.radarChartInstance.destroy();

    window.radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: { labels, datasets },
        options: {
            animation: { duration: 1200 },
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    grid: { color: 'rgba(0,0,0,0.1)', circular: true },
                    ticks: { stepSize: 20 }
                }
            },
            plugins: {
                legend: { display: true },
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
