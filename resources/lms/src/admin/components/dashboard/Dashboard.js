import React, {useState, useEffect} from 'react';
import {
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
import {prepareBarChart, prepareMonthlyBarChart, prepareCards} from "./prepareChartData";
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
    const totalCard = prepareCards(general, labels);

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
                    <CardBody>
                        <div className="text-value">{card.count}</div>
                        <div className="dashboard__card-icon">
                            <i className={card.icon}/>
                        </div>
                        <div className="mt-4">{card.title}</div>
                    </CardBody>
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
