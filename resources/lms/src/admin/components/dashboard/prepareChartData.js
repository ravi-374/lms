import {getStyle} from "@coreui/coreui/dist/js/coreui-utilities";
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {dateFormat} from "../../../constants";
import moment from "moment/moment";

const brandPrimary = getStyle('--primary');
const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandWarning = getStyle('--warning');
const brandDanger = getStyle('--danger');

const chartColors = [brandInfo, brandPrimary, brandWarning, brandDanger, brandSuccess];

export const cardChartData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: brandInfo,
            borderColor: 'rgba(255,255,255,.55)',
            data: [1, 18, 9, 17, 34, 22, 11],
        },
    ],
};

export const cardChartOpts1 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                },

            }],
        yAxes: [
            {
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
                    max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
                },
            }],
    },
    elements: {
        line: {
            tension: 0.00001,
            borderWidth: 1,
        },
        point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,
        },
    },
};

// Card Chart 2
export const cardChartData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: brandPrimary,
            borderColor: 'rgba(255,255,255,.55)',
            data: [65, 59, 84, 84, 51, 55, 40],
        },
    ],
};

export const cardChartOpts2 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                },

            }],
        yAxes: [
            {
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
                    max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
                },
            }],
    },
    elements: {
        line: {
            borderWidth: 1,
        },
        point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,
        },
    }
};

// Card Chart 3
export const cardChartData3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
            data: [78, 81, 80, 45, 34, 12, 40],
        },
    ],
};

export const cardChartOpts3 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                display: false,
            }],
        yAxes: [
            {
                display: false,
            }],
    },
    elements: {
        line: {
            borderWidth: 2,
        },
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
        },
    },
};

// Card Chart 4
export const cardChartData4 = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.3)',
            borderColor: 'transparent',
            data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
        },
    ],
};

export const cardChartOpts4 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                display: false,
                barPercentage: 0.6,
            }],
        yAxes: [
            {
                display: false,
            }],
    },
};


// Card Chart 5
export const cardChartData5 = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.3)',
            borderColor: 'transparent',
            data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
        },
    ],
};

export const cardChartOpts5 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                display: false,
                barPercentage: 0.6,
            }],
        yAxes: [
            {
                display: false,
            }],
    },
};

// Main Chart
export const prepareChartData = (chartData) => {
    const { total_books, total_issued_books, total_reserved_books, total_overdue_books, total_members } = chartData;
    return [total_books, total_issued_books, total_reserved_books, total_overdue_books, total_members];
};

export const prepareBarChart = (chartData, labels) => {
    return {
        labels,
        datasets: [
            {
                label: 'LMS',
                backgroundColor: chartColors,
                borderColor: chartColors,
                borderWidth: 1,
                hoverBackgroundColor: chartColors,
                hoverBorderColor: chartColors,
                data: prepareChartData(chartData),
                fill: false
            },
        ],
    };
};

const getChartData = (chartData) => {
    const startDate = moment().format(dateFormat.CHART_CUSTOM_DATE);
    const endDate = moment().add(1, 'M').format(dateFormat.CHART_CUSTOM_DATE);
    const { dates, books, issued_books, reserved_books, overdue_books, members } = chartData;
    let data = [books[startDate], issued_books[startDate], reserved_books[startDate],
        overdue_books[startDate], members[startDate]];
    if (books[endDate]) {
        data = [books[startDate].concat(books[endDate]),
            books[startDate].concat(books[endDate]),
            books[startDate].concat(books[endDate]), books[startDate].concat(books[endDate]),
            books[startDate].concat(books[endDate])]
    }
    return { data, dates };
};

export const prepareMonthlyBarChart = (chartData, labels) => {
    let dataSet = [];
    const { data, dates } = getChartData(chartData);
    labels.forEach((label, index) => {
        dataSet.push(
            {
                label,
                backgroundColor: chartColors[index],
                borderColor: chartColors[index],
                borderWidth: 1,
                hoverBackgroundColor: chartColors[index],
                hoverBorderColor: chartColors[index],
                data: data[index],
                fill: false
            },
        );
    });
    return { labels: dates, datasets: dataSet };
};

export const barChartOptions = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    animation: {
        duration: 5000
    },
    maintainAspectRatio: false,
    scales: {
        xAxes: [
            {
                barPercentage: 0.3,
                ticks: {
                    fontSize: 14,
                },
                stacked: true
            }],
        yAxes: [{
            display: true,
            ticks: {
                stepSize: 1,
                fontSize: 14,
            },
            stacked: true
        }],
    },
};

export const preparePieChart = (chartData, labels) => {
    let chart = {
        labels
    };
    chart.datasets = [
        {
            data: prepareChartData(chartData),
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors
        }
    ];
    return chart;
};
