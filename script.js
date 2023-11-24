const numProcessesInput = document.getElementById("numProcesses");
const generateChartButton = document.getElementById("generateChartButton");
const chartContainer = document.getElementById("chartContainer");

let processes = [];
let startTime = 0;
let endTime = 0;
let timeSlices = [];

generateChartButton.addEventListener("click", async () => {
  const numProcesses = parseInt(numProcessesInput.value);
  if (numProcesses > 0) {
    // Generate process data
    for (let i = 0; i < numProcesses; i++) {
      const process = {
        name: `Process ${i + 1}`,
        start: startTime,
        end: endTime,
      };
      processes.push(process);
      startTime += 50;
      endTime += 50;
    }

    // Generate time slices
    for (let i = 0; i <= endTime; i += 10) {
      timeSlices.push({
        value: i,
        label: `${i / 10}s`,
      });
    }

    // Create chart
    const ctx = chartContainer.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: timeSlices.map((slice) => slice.label),
        datasets: [
          {
            label: "Processes",
            data: processes.map((process) => process.start),
            backgroundColor: ["rgba(200, 100, 100, 0.1)"],
            borderColor: ["rgba(200, 100, 100, 1)"],
            borderWidth: 1,
          },
          {
            label: "Ready Queue",
            data: processes.map((process) => process.end - process.start),
            backgroundColor: ["rgba(100, 200, 100, 0.1)"],
            borderColor: ["rgba(100, 200, 100, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          display: true,
          position: "top",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  } else {
    alert("Please enter a valid number of processes");
  }
});
