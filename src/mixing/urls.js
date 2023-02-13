const base = 'http://109.205.180.74';

const global_variables = () => {
    return {
        sigin : `${base}:2000/api/v1/auth/login`,


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
        delFromCart: `${base}:1911/api/v1/carts`
    }
}


export default global_variables