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
import moment from "moment/moment";
import {dateFormat} from "../../../constants";

const Dashboard = (props) => {
    const { fetchDashBoardDetails, dashBoard, isLoading } = props;
    const [typeOfData, setTypeOfData] = useState('general');
    const [selectedMinDate, setSelectedMinDate] = useState(moment().startOf('month').toDate());
    const [selectedMaxDate, setSelectedMaxDate] = useState(moment().endOf('month').toDate());
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
        const inputToady = moment().format(dateFormat.CHART_CUSTOM_DATE);
        const inputNextWeek = moment().add(1, 'week').format(dateFormat.CHART_CUSTOM_DATE);
        const inputLastWeek = moment().subtract(1, 'week').format(dateFormat.CHART_CUSTOM_DATE);
        const inputStartMonth = moment().startOf('month').format(dateFormat.CHART_CUSTOM_DATE);
        const inputNextMonth = moment().endOf('month').format(dateFormat.CHART_CUSTOM_DATE);
        const inputStartOfLastMonth = moment().subtract(1, 'months').startOf('month').format(dateFormat.CHART_CUSTOM_DATE);
        const inputEndOfLastMonth = moment().subtract(1, 'months').endOf('month').format(dateFormat.CHART_CUSTOM_DATE);
        const inputInterStartMediateDate = moment(selectedMinDate).format(dateFormat.CHART_CUSTOM_DATE);
        const inputInterMediateEndDate = moment(selectedMaxDate).format(dateFormat.CHART_CUSTOM_DATE);

        const { general, today, currentWeek, lastWeek, currentMonth, lastMonth, interMonth } = chartData;
        if (type === chartLabelSelector.TODAY && today) {
            return prepareBarChart(today, labels, inputToady)
        } else if (type === chartLabelSelector.THIS_WEEK && currentWeek) {
            return prepareMonthlyBarChart(currentWeek, labels, inputToady, inputNextWeek);
        } else if (type === chartLabelSelector.LAST_WEEK && lastWeek) {
            return prepareMonthlyBarChart(lastWeek, labels, inputLastWeek, inputToady);
        } else if (type === chartLabelSelector.THIS_MONTH && currentMonth) {
            return prepareMonthlyBarChart(currentMonth, labels, inputStartMonth, inputNextMonth);
        } else if (type === chartLabelSelector.LAST_MONTH && lastMonth) {
            return prepareMonthlyBarChart(lastMonth, labels, inputStartOfLastMonth, inputEndOfLastMonth);
        }
        else if (type === chartLabelSelector.CUSTOM && interMonth) {
            return prepareMonthlyBarChart(interMonth, labels, inputInterStartMediateDate, inputInterMediateEndDate);
        } else {
            return prepareBarChart(general, labels);
        }
    };

    const onMonthSelector = (params = {}) => {
        fetchDashBoardDetails(params);
    };

    const chartOptions = {
        general, chartData: renderChartData(dashBoard, typeOfData), onMonthSelector, setTypeOfData,
        selectedMinDate, setSelectedMinDate, selectedMaxDate, setSelectedMaxDate
    };

    const renderCards = () => {
        return totalCard.map((card, index) => (
            <Col key={index} className="dashboard__card-wrapper col-12 col-sm-6 col-lg-3">
                <Card className={`text-white ${card.color}`}>
                    <CardBody>
                        <div className="dashboard__card-count">{card.count}</div>
                        <div className="dashboard__card-icon">
                            <i className={card.icon}/>
                        </div>
                        <div className="dashboard__card-title text-nowrap">{card.title}</div>
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
