import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CButton
} from '@coreui/react'
import SerialsController from '../../../../app/Controllers/SerialsController'



class ImportSerial extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            serialsData: []
        }
        this.pageNr = 1
    }

    componentDidMount() {
        SerialsController.importList("swatchseries/" + this.pageNr).then(data => {
            this.setState({ isLoading: false, serialsData: data })
        })

    }


    importSerials = () => {
        SerialsController.postToDb({ serials: this.state.serialsData }).then(data => {
            console.log(data)
        })
    }
    autoImportSerials = () => {
        SerialsController.importList("swatchseries/" + this.pageNr).then(data => {
            this.pageNr = this.pageNr + 1
            this.setState({ isLoading: false, serialsData: data })
        })
        SerialsController.postToDb({ serials: this.state.serialsData }).then(data => {
            this.autoImportSerials()
            console.log(this.pageNr + ' - ' + data)
        })
    }

    render() {
        return (
            <>

                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Condensed Table

                            {/* <div className="card-header-actions" style={{ flexDirection: "row" }}> */}
                            <CButton onClick={() => this.importSerials()} size="sm" className={'float-right mr-0'} color="success">Import</CButton>
                            <CButton onClick={() => this.autoImportSerials()} size="sm" className={'float-right mr-2'} color="primary">Auto Import</CButton>
                            {/* </div> */}
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
                                                            <b>{item.title} - {item.year}</b><br />
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
                        </CCardBody>
                    </CCard>
                </CCol>
            </>
        )
    }
}


export default ImportSerial
