export const setSuccess = (data, response) => {
    response.status(200);
    response.json(data);
}

export const setNewRecordCreatedSuccess = (token, response) => {
    response.status(201).json({
        code: "Success",
        message: "Record created successfully.",
        token: token  // The JWT token generated after successful signup
    });
}

export const setRoleError = (response) => {
    response.status(403).json({
        code: "Forbidden",
        message: "Invalid role"    
    });
}

export const setServerError = (error, response) => {
    response.status(500);
    response.json({
        code: "Error",
        message: error.message
    });
}

export const setUnauthorized = (response) => {
    response.status(401).json({
        code: "Unauthorized",
        message: "Invalid credentials. Please check your email and password."
    });
};

export const setConflict = (response) => {
    response.status(409).json({
        code: 'User already exists',
      message: 'A user with this email already exists.'
    });
};

export const setBadRequest = (message, response) => {
    response.status(400).json({
        code: "Bad Request",
        message: message || "The request could not be understood or was missing required parameters."
    });
};

export const setNotFound = (message, response) => {
    response.status(404).json({
        code: "Not Found",
        message: message || "The requested resource was not found."
    });
};

export const setMethodNotAllowed = (response) => {
    response.status(405).json({
        code: "Method Not Allowed",
        message: "The HTTP method is not allowed for this resource."
    });
};

export const setUnprocessableEntity = (response) => {
    console.log(response);
    response.status(422).json({
        code: "Unprocessable Entity",
        message: "Invalid email"
    });
};

export const setForbidden = (message, response) => {
    response.status(403).json({
        code: "Forbidden",
        message: message || "You do not have permission to perform this action."
    });
};


export const setServiceUnavailable = (response) => {
    response.status(503).json({
        code: "Service Unavailable",
        message: "The service is currently unavailable. Please try again later."
    });
};