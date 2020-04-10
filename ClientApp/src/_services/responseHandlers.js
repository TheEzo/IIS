export handleError, handleResponse;

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            console.log("Response ok: ", response);
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            console.log("Response error: ", response);
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    console.log("Response error: ", error);
    return Promise.reject(error && error.message);
}