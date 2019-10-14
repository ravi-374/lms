import React, {useState, useEffect} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
    ButtonGroup,
    Card,
    CardBody,
    Col,
    Row,
} from 'reactstrap';
import {connect} from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import Charts from './charts/Charts';
import {
    prepareBarChart,
    cardChartData1, cardChartData2, cardChartData3, cardChartData4, cardChartData5, cardChartOpts1,
    cardChartOpts2, cardChartOpts3, cardChartOpts4, cardChartOpts5, prepareMonthlyBarChart,
} from "./prepareChartData";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import {fetchDashBoardDetails} from "../../store/actions/dashBoardAction";
import {getFormattedMessage, getFormattedOptions} from "../../../shared/sharedMethod";
import {chartLabels, chartLabelSelector} from "../../constants";

const Dashboard = (props) => {
    const { fetchDashBoardDetails, dashBoard, isLoading } = props;
    const [typeOfData, setTypeOfData] = useState('general');
    const labels = getFormattedOptions(chartLabels).map((({ name }) => name));

    useEffect(() => {
        fetchDashBoardDetails();
    }, []);

    if (_.isEmpty(dashBoard) || !dashBoard.general) {
        return <ProgressBar/>;
    }
    const { general } = dashBoard;
    const { total_books, total_issued_books, total_reserved_books, total_overdue_books, total_members } = general;
    const totalCard = [
        {
            type: 'line',
            title: labels[0],
            color: 'bg-info',
            count: total_books,
            data: cardChartData1,
            dataOptions: cardChartOpts1,
            icon: 'fa fa-book'
        },
        {
            type: 'line',
            title: labels[1],
            color: 'bg-primary',
            count: total_issued_books,
            data: cardChartData2,
            dataOptions: cardChartOpts2,
            icon: 'fas fa-book-reader'
        },
        {
            type: 'line',
            title: labels[2],
            color: 'bg-warning',
            count: total_reserved_books,
            data: cardChartData3,
            dataOptions: cardChartOpts3,
            icon: 'fas fa-book-reader'
        },
        {
            type: 'bar',
            title: labels[3],
            color: 'bg-danger',
            count: total_overdue_books,
            data: cardChartData4,
            dataOptions: cardChartOpts4,
            icon: 'fas fa-book-reader'
        },
        {
            type: 'bar',
            title: labels[4],
            color: 'bg-success',
            count: total_members,
            data: cardChartData5,
            dataOptions: cardChartOpts5,
            icon: 'fas fa-users'
        },
    ];

    const renderChartData = (chartData, type) => {
        const { general, today, currentWeek, lastWeek, currentMonth, lastMonth, interMonth } = chartData;
        if (type === chartLabelSelector.TODAY && today) {
            return prepareBarChart(today, labels)
        } else if (type === chartLabelSelector.THIS_WEEK && currentWeek) {
            return prepareMonthlyBarChart(currentWeek, labels)
        } else if (type === chartLabelSelector.LAST_WEEK && lastWeek) {
            return prepareMonthlyBarChart(lastWeek, labels)
        } else if (type === chartLabelSelector.THIS_MONTH && currentMonth) {
            return prepareMonthlyBarChart(currentMonth, labels)
        } else if (type === chartLabelSelector.LAST_MONTH && lastMonth) {
            return prepareMonthlyBarChart(lastMonth, labels)
        }
        else if (type === chartLabelSelector.CUSTOM && interMonth) {
            return prepareMonthlyBarChart(interMonth, labels)
        } else {
            return prepareBarChart(general, labels);
        }
    };

    const onMonthSelector = (params = {}) => {
        fetchDashBoardDetails(params);
    };
    const chartOptions = { general, chartData: renderChartData(dashBoard, typeOfData), onMonthSelector, setTypeOfData };

    const renderCards = () => {
        return totalCard.map((card, index) => (
            <Col key={index} className="dashboard__card-wrapper">
                <Card className={`text-white ${card.color}`}>
                    <CardBody className="pb-0">
                        <ButtonGroup className="float-right">
                            <i className={card.icon}/>
                        </ButtonGroup>
                        <div className="text-value">{card.count}</div>
                        <div>{card.title}</div>
                    </CardBody>
                    <div className={`chart-wrapper ${card.color === 'bg-warning' ? '' : 'mx-3'}`}
                         style={{ height: '70px' }}>
                        {card.type === 'line' ?
                            <Line data={card.data} options={card.dataOptions} height={70}/> :
                            <Bar data={card.data} options={card.dataOptions} height={70}/>
                        }
                    </div>
                </Card>
            </Col>
        ));
    };

    return (
        <div className="animated fadeIn">
            <Row>
                <Col sm={12} className="mb-2">
                    {isLoading ? <ProgressBar/> : null}
                    <HeaderTitle title="Dashboard"/>
                    <h5 className="page-heading">{getFormattedMessage('dashboard.title')}</h5>
                </Col>
                {renderCards()}
            </Row>
            <Charts {...chartOptions}/>
        </div>
    );
};

Dashboard.propTypes = {
    dashBoard: PropTypes.object,
    isLoading: PropTypes.bool,
    fetchDashBoardDetails: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { dashBoard, isLoading } = state;
    return { dashBoard, isLoading };
};

export default connect(mapStateToProps, { fetchDashBoardDetails })(Dashboard);
