export function formatDate (timestamp) {
    const d = new Date(timestamp)
    return d.toLocaleDateString('pt-br')
}

export function formatQuestionUser (question, author, authedUser) {
    const {id, optionOne, optionTwo, timestamp} = question
    const {name, avatarURL} = author

    return {
        name,
        id,
        optionOne,
        optionTwo,
        timestamp,
        avatar: avatarURL
    }
}