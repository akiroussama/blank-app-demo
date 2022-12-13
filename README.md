# blank-app-demo
1) Create a blank app demo:
Add Vite to a blank app demo:
https://vitejs.dev/guide/
yarn create vite

2) Add Vitest for unit testing:
Add Vitest for unit testing:
https://vitest.dev/guide/
yarn add -D vitest

Add config to package.json:
"test": "vitest",

install @vitest/coverage-c8 for coverage:
yarn add -D @vitest/coverage-c8
add config to package.json:
"coverage": "vitest run --coverage"


3) Add first test:
https://vitest.dev/guide/getting-started.html#first-test
import { describe, it, expect } from 'vitest';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

4) Add React testing library and jsdom for more realistic testing:
Add React testing library and jest-dom:
yarn add -D @testing-library/react @testing-library/jest-dom jsdom

Add config to vitest.config.ts:
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
	},
});



Update test in App.test.tsx:
import { describe, it, expect, test } from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

describe("Real test", () => {
    test("should show count element", () => {
        
        render(<App></App>);

        expect(screen.getByText(/count is/i)).toBeDefined()
    });
    test("should show count element", () => {
        
        render(<App></App>);

        expect(screen.getByText(/count is/i)).toBeDefined()
    })
})


5) improve test ( add test for button click)
import {beforeEach, describe, it, expect, test } from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

describe("Real test", () => {
    beforeEach(() => {
       render(<App></App>);
    });
    test("should show count element", () => {
        expect(screen.getByText(/count is/i)).toBeDefined()
    });
    test("should show count element", () => {

        expect(screen.getByText(/count is/i)).toBeDefined()
    })
      test("should not show the content at the start", () => {

        expect(screen.queryByText(/Content/i)).not.toBeInTheDocument();
    })
      test("should show the content on accordion click",async () => {

        const countButton = screen.getByText(/count is/i);
         const button = screen.getByRole('button');
        fireEvent.click(button)
        fireEvent.click(countButton)

        expect(await screen.findByText(/count is 2/i)).toBeInTheDocument();
    })
})


6) Add login page

7) Add Quotes list page ( fetch data from api )

8) Install cypress :  yarn add cypress --dev

9) add E2E test for app, login and quotes list page

10) run E2E test : yarn add cypress --dev

11) Create backend:
   a) create a new folder for backend 
   b) init a new node project: yarn init -y
   c) install apollo server: yarn add @apollo/server
   https://www.apollographql.com/docs/apollo-server/getting-started/
   d) create src folder and index.js file :
    (windows): mkdir src & echo.> src/index.js
    (linux): mkdir src && touch src/index.js
    (mac): mkdir src && touch src/index.js


12 ) install with typescript:
    a) yarn add  typescript @types/node --dev
    b) yarn tsc --init ( to create tsconfig.json file )
    c) add config to tsconfig.json:
     {
        "compilerOptions": {
          "rootDirs": ["src"],
          "outDir": "dist",
          "lib": ["es2020"],
          "target": "es2020",
          "module": "esnext",
          "moduleResolution": "node",
          "esModuleInterop": true,
          "types": ["node"]
        }
      }

     d) Finally, replace the default scripts entry in your package.json file with the following type and scripts entries:
     {
  // ...etc.
  "type": "module",
  "scripts": {
    "compile": "tsc",
    "start": "npm run compile && node ./dist/index.js"
  }
  // other dependencies
}
12) install graphql: yarn add graphql
13) add graphql schema:
    b) add schema :
        const typeDefs = `#graphql
        # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

        # This "Book" type defines the queryable fields for every book in our data source.
        type Book {
          id: ID
          title: String
          author: String
        }

        # The "Query" type is special: it lists all of the available queries that
        # clients can execute, along with the return type for each. In this
        # case, the "books" query returns an array of zero or more Books (defined above).
        type Query {
          books: [Book]
        }
      `;
14) add resolvers:
    const books = [
      {
        id: 1,
        title: "The Awakening",
        author: "Kate Chopin",
      },
      {
        id: 2,
        title: "City of Glass",
        author: "Paul Auster",
      },
    ];

    // Resolvers define how to fetch the types defined in your schema.
    // This resolver retrieves books from the "books" array above.
    const resolvers = {
      Query: {
        books: () => books,
      },
    };

15) add apollo server to index.js::
  
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

16) Add apollo client to frontend:
   https://www.apollographql.com/docs/react/get-started
    a) yarn add @apollo/client graphql
    b) add apollo client to index.js:
   import {
      ApolloClient,
      InMemoryCache,
      ApolloProvider,
      useQuery,
      gql
    } from "@apollo/client";
    c) add apollo client to index.js:
    const client = new ApolloClient({
      uri: 'http://localhost:4000',
      cache: new InMemoryCache()
    });
    d) add apollo provider to index.js:
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
17) Add quotes list page:
    
