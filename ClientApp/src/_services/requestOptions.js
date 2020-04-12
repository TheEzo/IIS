
export const GETOptions = {
    method: 'GET',
    headers: {
        'Accept': '*/*',
    },
    credentials: 'include',
    mode: 'cors',
};

export const POSTOptions = (formData) => ({
    method: 'POST',
    headers: {
        'Accept': '*/*',
    },
    credentials: 'include',
    mode: 'cors',
    body: formData
});

export const PUTOptions = (formData) => ({
    method: 'PUT',
    headers: {
        'Accept': '*/*',
    },
    credentials: 'include',
    mode: 'cors',
    body: formData
});