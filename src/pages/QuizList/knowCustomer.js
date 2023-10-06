import React, { Component } from "react";
import { Row, Col, Label, Input, Form, Button, FormGroup } from "reactstrap";

export default class knowCustomer extends Component {
  render() {
    return (
      <div>
        <Form className="card p-3">
          <h4>Know Your Customer with some questions</h4>
          <Row>
            <Col lg="12">
              <FormGroup>
                <Label for="question-input1">Describe Question</Label>
                <textarea
                  id="question-input1"
                  className="form-control"
                  rows="2"
                  placeholder="Describe your question here..."
                ></textarea>
              </FormGroup>
            </Col>

            <Col lg="6">
              <FormGroup>
                <Label for="answer-input1">Describe Answer</Label>
                <Input
                  className="form-control"
                  type="text"
                  defaultValue=""
                  id="answer-input1"
                  placeholder="Enter your answer..."
                />
              </FormGroup>
              <div>
                <img
                  src="https://i.pinimg.com/originals/46/e3/ac/46e3ac9f52ad9af667f32e79f081e03a.jpg"
                  alt="images"
                  className="rounded avatar-md card-img"
                />
              </div>
            </Col>
            <Col lg="6">
              <FormGroup className="mb-0">
                <div className="button-items pt-4">
                  <Button
                    color="danger"
                    type="button"
                    className="waves-effect waves-light customUploadBtn mr-1"
                  >
                    <i className="ri-add-fill align-middle mr-1"></i> Add image
                    <input type="file" className="upload_input" />
                  </Button>

                  <Button
                    color="secondary"
                    type="button"
                    className="waves-effect waves-light mr-1"
                  >
                    Add More Answers{" "}
                    <i className="ri-add-fill align-middle ml-1"></i>
                  </Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <ul className="pager wizard twitter-bs-wizard-pager-link">
            <li className="previous">
              <Button
                color="primary"
                type="button"
                className="waves-effect waves-light mr-1"
              >
                Submit <i className="ri-arrow-right-line align-middle ml-1"></i>
              </Button>
            </li>
            <li className="next">
              <Button
                color="info"
                type="button"
                className="waves-effect waves-light mr-1"
              >
                Add More Questions{" "}
                <i className="ri-add-fill align-middle ml-1"></i>
              </Button>
            </li>
          </ul>
        </Form>
      </div>
    );
  }
}
