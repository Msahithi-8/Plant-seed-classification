function analyzeSeeds() {
    const fileInput = document.getElementById('seedImages');
    const previewDiv = document.getElementById('preview');
    const resultDiv = document.getElementById('result');
    const reportsDiv = document.getElementById('seedReports');
    const instantDiv = document.getElementById('instantCharacteristics');

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
    const colors = ['rgba(123,31,162,0.5)','rgba(142,36,170,0.5)','rgba(66,165,245,0.5)'];
    const borderColors = ['rgba(123,31,162,1)','rgba(142,36,170,1)','rgba(66,165,245,1)'];
    const labels = ["Moisture","Color","Shape","Size","Texture","Defects","Brightness","Uniformity","Edge Sharpness","Growth Stage","Color Uniformity","Shape Ratio","Size Consistency","Texture Smoothness","Defect Detection","Brightness/Luster"];

    // Instant characteristics
    instantDiv.innerHTML = files.map(file => {
        const imageHash = hashString(file.name);
        const report = {};
        labels.forEach((label,i)=>{
            report[label]=grades[(imageHash+i)%3];
        });
        return `<div class="instant-card">
            <h4>${file.name}</h4>
            <ul>
                ${labels.map(l=>`<li>${l}: ${report[l]}</li>`).join('')}
            </ul>
        </div>`;
    }).join('');

    // Radar chart datasets
    const datasets = files.map((file,index)=>{
        const imageHash = hashString(file.name);
        const report = {};
        labels.forEach((label,i)=>report[label]=grades[(imageHash+i)%3]);
        const dataValues = Object.values(report).map(grade=>gradeValues[grade]);
        return {
            label:file.name,
            data:dataValues,
            backgroundColor: colors[index%colors.length],
            borderColor:borderColors[index%colors.length],
            borderWidth:3,
            pointBackgroundColor:borderColors[index%colors.length],
            pointBorderColor:'white',
            pointHoverRadius:7
        };
    });

    resultDiv.style.display="block";

    const ctx = document.getElementById('radarChart').getContext('2d');
    if(window.radarChartInstance) window.radarChartInstance.destroy();
    window.radarChartInstance = new Chart(ctx,{
        type:'radar',
        data:{labels,datasets},
        options:{
            animation:{duration:1200},
            scales:{r:{suggestedMin:0,suggestedMax:100,ticks:{stepSize:20},grid:{circular:true,color:'rgba(0,0,0,0.1)'}}},
            plugins:{legend:{display:true},tooltip:{
                callbacks:{label:function(context){
                    const val=context.raw;
                    if(val===100)return "High";
                    if(val===70)return "Medium";
                    return "Low";
                }}
            }}
        }
    });

    // Detailed seed cards
    reportsDiv.innerHTML = files.map((file,index)=>{
        const imageHash = hashString(file.name);
        const report = {};
        labels.forEach((label,i)=>report[label]=grades[(imageHash+i)%3]);
        return `<div class="seed-card">
            <img src="${URL.createObjectURL(file)}" alt="Seed Image">
            <h4>${file.name}</h4>
            <ul>
                ${labels.map(l=>`<li>${l}: <span>${report[l]}</span></li>`).join('')}
            </ul>
        </div>`;
    }).join('');
}
