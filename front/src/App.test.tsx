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