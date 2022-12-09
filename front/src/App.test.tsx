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