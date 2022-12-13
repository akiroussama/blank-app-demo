// this is a component to query the GraphQL server for a list of books:

import { gql, useQuery } from '@apollo/client';

const GET_BOOKS = gql`
    query GetBooks {
        books {
            id
            title
            author
        }
    }
`;

const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.books.map(({ id, title, author }: any) => (
        <div key={id}>
            <p>
                {title}: {author}
            </p>
        </div>
    ));
};

export default BookList;
