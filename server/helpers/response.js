// response success handler
const getSuccessResponse = (responseData) => {
    return ({ isSuccess: true, data: responseData })
}

// response failure handler
const getFailureResponse = (message) => {
    if (!message) {
        message = "Something went wrong.";
    }
    return ({ isSuccess: false, message })
}

module.exports = { getSuccessResponse, getFailureResponse }