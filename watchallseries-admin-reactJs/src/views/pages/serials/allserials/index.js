import React from "react"
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol
} from '@coreui/react'
import SerialsController from '../../../../app/Controllers/SerialsController'

import { Pagination } from 'react-laravel-paginex'
import { Link } from "react-router-dom"


class AllSerials extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: [],
            serialsData: []
        }
    }


    componentDidMount() {
        this.getData()
    }

    getData = (data) => {
        SerialsController.getAllSerials(!data ? 1 : data.page).then(data => {
            this.setState({
                isLoading: false,
                serialsData: data.data,
                data
            })
        })
    }



    render() {
        return (
            <>

                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Condensed Table
                        </CCardHeader>
                        <CCardBody>


                            <div className="position-relative table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ verticalAlign: 'middle', overflow: 'hidden' }}>
                                                <div className="d-inline">Image</div>
                                            </th>
                                            <th style={{ verticalAlign: 'middle', overflow: 'hidden' }}>
                                                <div className="d-inline">Title</div>
                                            </th>
                                            <th style={{ verticalAlign: 'middle', overflow: 'hidden' }}>
                                                <div className="d-inline">Published</div>
                                            </th>
                                            <th style={{ verticalAlign: 'middle', overflow: 'hidden' }}>
                                                <div className="d-inline">Status</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.isLoading ?
                                            <tr><td>Loading</td></tr>
                                            :
                                            this.state.serialsData.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td >
                                                            <img style={{ width: 119, height: 189 }} src={item.thumbnail} alt={item.title} />
                                                        </td>
                                                        <td>
                                                            <b>
                                                                <Link to={`/serials/edit/${item.id}`} >  {item.title} - {item.release_date}</Link>
                                                            </b><br />
                                                            <p>{item.description}</p>
                                                        </td>
                                                        <td >{item.published}</td>
                                                        <td><span className="badge badge-success">Active</span></td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>

                            </div>


                            <Pagination changePage={this.getData} data={this.state.data} />



                        </CCardBody>
                    </CCard>
                </CCol>
            </>
        )
    }
}
export default AllSerials