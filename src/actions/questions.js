import { _saveQuestion } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'


function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}
export function handleAddQuestion (text1, text2) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        let question = {
            optionOneText: text1,
            optionTwoText: text2,
            author: authedUser
        }
        return _saveQuestion(question)
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
}
export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}