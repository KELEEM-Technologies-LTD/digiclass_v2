const base = "http://109.205.180.74";

const global_variables = () => {
  return {
    sigin: `${base}:2000/api/v1/auth/login`,
    signup: `${base}:2000/api/v1/auth/signup`,
    checkuser: `${base}:2000/api/v1/auth/available`,
    resetemail: `${base}:2000/api/v1/auth/reset`,
    resetPwd: `${base}:2000/api/v1/auth/reset/verify`,

    //Course related
    getCourses: `${base}:1906/api/v1/courses`,
    getCategories: `${base}:1906/api/v1/categories`,
    getSections: `${base}:1906/api/v1/sections`,
    getReviews: `${base}:1908/api/v1/reviews`,
    postReviews: `${base}:1908/api/v1/reviews`,
    getUser: `${base}:1904/api/v1/users`,

    //Cart
    getCart: `${base}:1911/api/v1/carts`,
    addToCart: `${base}:1911/api/v1/carts`,
    delFromCart: `${base}:1911/api/v1/carts`,

    //User profile
    updateProfile: `${base}:1904/api/v1/users`,
    updateinformation: `${base}:1901/api/v1/users`,

    //transactions
    getTransactions: `${base}:1098/transactions/list`,

    //notification
    getNotifications: `${base}:1099/notification/list`,
    updateSeen: `${base}:1099/notification/seen`,
    postNotification: `${base}:1099/notification/sendnotifcation`,

    //myCourse
    getmypaidc: `${base}:1098/transactions/listpaid`,

    //transactions
    verifyTransactions: `${base}:1098/transactions/verify`,
    initiatePyament: `${base}:1098/transactions/initialize`,

    //messages
    sendMessage: `${base}:1913/api/v1/messages`,
    getContactList: `${base}:3000/messages/contact`,
    getRequestList: `${base}:3000/messages/request`,
    getMsgName: `${base}:3000/messages/name`,
    getMsg: `${base}:3000/messages/chats`,
    sendMsg: `${base}:3000/messages/send`,
  };
};

export default global_variables;
