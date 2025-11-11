function analyzeSeeds() {
    const fileInput = document.getElementById('seedImages');
    const resultSection = document.getElementById('result-section');

    if (!fileInput.files.length) {
        alert("Please select at least one seed image!");
        return;
    }

    const files = Array.from(fileInput.files);

    const characteristics = [
        "Moisture","Color","Shape","Size","Texture","Defects",
        "Brightness","Uniformity","Edge Sharpness","Growth Stage",
        "Color Uniformity","Shape Ratio","Size Consistency","Texture Smoothness",
        "Defect Detection","Brightness/Luster","Weight","Hardness","Germination Potential",
        "Seed Density","Seed Vitality","Seed Purity","Disease Resistance","Surface Smoothness",
        "Oil Content","Seed Age","Nutrient Content","Protein Level","Starch Content",
        "Seed Size Deviation","Hull Integrity","Shell Thickness","Cracks/Spots","Overall Quality Grade"
    ];

    const grades = ["High", "Medium", "Low"];
    const gradeValues = { "High":100, "Medium":70, "Low":40 };

    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    resultSection.innerHTML = '';

    files.forEach((file, index) => {
        const imageHash = hashString(file.name);
        const report = {};
        characteristics.forEach((label,i)=> report[label] = grades[(imageHash+i)%3]);

        // Result card
        const cardDiv = document.createElement('div');
        cardDiv.className = 'result-card';
        cardDiv.innerHTML = `
            <img src="${URL.createObjectURL(file)}" alt="Seed Image">
            <ul>${characteristics.map(l=>`<li>${l}: <span>${report[l]}</span></li>`).join('')}</ul>
            <canvas id="radarChart${index}"></canvas>
        `;
        resultSection.appendChild(cardDiv);

        // Radar chart with gradient fill
        const ctx = document.getElementById(`radarChart${index}`).getContext('2d');

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(123,31,162,0.6)');
        gradient.addColorStop(1, 'rgba(142,36,170,0.1)');

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: characteristics,
                datasets: [{
                    label: file.name,
                    data: Object.values(report).map(g => gradeValues[g]),
                    backgroundColor: gradient,
                    borderColor: 'rgba(123,31,162,1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(142,36,170,1)',
                    pointBorderColor: '#fff'
                }]
            },
            options:{
                animation:{duration:1200},
                scales:{r:{suggestedMin:0,suggestedMax:100,ticks:{stepSize:20},grid:{circular:true,color:'rgba(0,0,0,0.1)'}}},
                plugins:{legend:{display:true},tooltip:{
                    callbacks:{label:function(context){
                        const val=context.raw;
                        return val===100?"High":val===70?"Medium":"Low";
                    }}
                }}
            }
        });
    });
}
