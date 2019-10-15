import {getStyle} from "@coreui/coreui/dist/js/coreui-utilities";
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {dateFormat} from "../../../constants";
import moment from "moment/moment";

const brandPrimary = getStyle('--primary');
const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandWarning = getStyle('--warning');
const brandDanger = getStyle('--danger');

const chartColors = [brandInfo, brandSuccess, brandPrimary, brandWarning, brandDanger];

// Main Chart
export const prepareChartData = (chartData) => {
    const { total_books, total_members, total_issued_books, total_reserved_books, total_overdue_books } = chartData;
    return [total_books, total_members, total_issued_books, total_reserved_books, total_overdue_books];
};

export const prepareCards = (chartData, labels) => {
    const { total_books, total_members, total_issued_books, total_reserved_books, total_overdue_books } = chartData;
    return [
        {
            title: labels[0],
            color: 'bg-info',
            count: total_books,
            icon: 'fa fa-book fa-2x'
        },
        {
            title: labels[1],
            color: 'bg-success',
            count: total_members,
            icon: 'fas fa-users fa-2x'
        },
        {
            title: labels[2],
            color: 'bg-primary',
            count: total_issued_books,
            icon: 'fas fa-book-reader fa-2x'
        },
        {
            title: labels[3],
            color: 'bg-warning',
            count: total_reserved_books,
            icon: 'fas fa-book-reader fa-2x'
        },
        {
            type: 'bar',
            title: labels[4],
            color: 'bg-danger',
            count: total_overdue_books,
            icon: 'fas fa-book-reader fa-2x'
        },
    ];
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
    let data = [books[startDate], members[startDate], issued_books[startDate], reserved_books[startDate],
        overdue_books[startDate]];
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
