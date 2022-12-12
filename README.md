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
Add @testing-library/react and jsdom:
yarn add -D @testing-library/react @testing-library/jest-dom

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