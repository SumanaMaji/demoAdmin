import React, { Component } from "react";
import { Container } from "reactstrap";
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Admin", link : "#" },
                { title : "Dashboard", link : "#" },
            ]
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        Welcome To Dashboard...
                    </Container> 
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
