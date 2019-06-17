import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

import { Redirect} from 'react-router-dom'

class AddQuestion extends Component{
    state ={
        firstOption: '',
        secondOption: '',
        redirectToHome: false
    }
    handleFirstOption = (e) => {
        const text = e.target.value
        this.setState(()=>({
            firstOption: text,
        }))
    }
    handleSecondOption = (e) => {
        const text = e.target.value
        this.setState(()=>({
            secondOption: text,
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { firstOption, secondOption } = this.state
        this.props.handleAddQuestion(firstOption, secondOption)
        this.setState(() => ({
            firstOption: '',
            secondOption: '',
            redirectToHome: true
        }))
    }
    render() {
        const { firstOption, secondOption } = this.state
        return (
            <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Label>Would you rather ...</Form.Label>
                <Form.Group controlId="option1">
                    <Form.Control value={firstOption} placeholder="Enter option 1" onChange={this.handleFirstOption} />
                </Form.Group>
                <Form.Label>OR</Form.Label>
                <Form.Group controlId="option2">
                    <Form.Control value={secondOption} placeholder="Enter option 2" onChange={this.handleSecondOption} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={firstOption === '' || secondOption ===''}>
                    Submit
                </Button>
            </Form>
            {this.state.redirectToHome === true
            ?<Redirect to='/' />
            : null}
            </div>

        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps, {handleAddQuestion})(AddQuestion)