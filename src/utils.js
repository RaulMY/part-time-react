export const domain = 'http://localhost:5000/api/';
export const routes = {
    signUp: {
        endpoint: domain + 'signup',
        requestType: 'POST'
    },
    logIn: {
        endpoint: domain + 'login',
        requestType: 'POST'
    },
    isLoggedIn: {
        endpoint: domain + 'loggedin',
        requestType: 'GET'
    },
    logout: {
        endpoint: domain + 'logout',
        requestType: 'POST'
    },
    getTasks: {
        endpoint: domain + 'tasks',
        requestType: 'GET'
    },
    newTask: {
        endpoint: domain + 'tasks/create',
        requestType: 'POST'
    },
    updateTask: {
        endpoint: domain + 'tasks/edit/',
        requestType: 'POST'
    },
    deleteTask: {
        endpoint: domain + 'tasks/delete/',
        requestType: 'POST'
    }
}