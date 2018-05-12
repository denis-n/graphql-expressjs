const axios = require('axios');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;


const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {

                const companyId = parentValue.id;

                return axios.get(`http://localhost:3000/companies/${companyId}/users`)
                    .then(result => result.data);
            }
        }
    })
});


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {

                const companyId = parentValue.companyId;

                return axios.get(`http://localhost:3000/companies/${companyId}`)
                    .then(response => response.data);
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args) {

                const id = args.id;

                return axios.get(`http://localhost:3000/users/${id}`)
                    .then(response => response.data);
            }
        },
        company: {
            type: CompanyType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args) {

                const id = args.id;

                return axios.get(`http://localhost:3000/companies/${id}`)
                    .then(response => response.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});