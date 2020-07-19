import React from "react"

class EditSerial extends React.Component {
    componentDidMount(){
        console.log(this.props.match.params.id)
    }
    render() {
        return (
            <div>EditSerial</div>
        )
    }
}
export default EditSerial