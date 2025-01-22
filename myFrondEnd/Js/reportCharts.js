const courses = ["Meditación", "Yoga", "Mindfulness", "Relajación", "Masajes"];
const mostSold = [150, 120, 100, 90, 80];
const leastSold = [10, 15, 20, 25, 30];
const abandonedCourses = [20, 25, 10, 15, 5];
const completedCourses = [100, 110, 90, 85, 80];


function createBarChart(ctx, labels, data, title, bgColor, borderColor) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: bgColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createPieChart(ctx, labels, data, title) {
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#F44336'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const mostSoldCtx = document.getElementById("mostSoldChart").getContext("2d");
    createBarChart(mostSoldCtx, courses, mostSold, "Cursos Más Vendidos", "rgba(54, 162, 235, 0.5)", "rgba(54, 162, 235, 1)");

    const leastSoldCtx = document.getElementById("leastSoldChart").getContext("2d");
    createBarChart(leastSoldCtx, courses, leastSold, "Cursos Menos Vendidos", "rgba(255, 99, 132, 0.5)", "rgba(255, 99, 132, 1)");

    const abandonedCoursesCtx = document.getElementById("abandonedCoursesChart").getContext("2d");
    createPieChart(abandonedCoursesCtx, courses, abandonedCourses, "Cursos Abandonados");

    const completedCoursesCtx = document.getElementById("completedCoursesChart").getContext("2d");
    createPieChart(completedCoursesCtx, courses, completedCourses, "Cursos Completados");
});
