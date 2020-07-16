import React from 'react'
import DashboardController from '../../../app/Controllers/DashboardController'



class Dashboard extends React.Component {
    componentDidMount() {
        DashboardController.getDashboardData().then(data => {
            console.log(JSON.parse(localStorage.getItem('user')))
        })
    }
    render() {
        return (
            <>
                Dashboard
            </>
        )
    }
}


export default Dashboard
