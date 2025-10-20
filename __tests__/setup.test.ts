// __tests__/setup.test.ts
describe('Test Setup Verification', () => {
  test('Jest should work with simple arithmetic', () => {
    expect(1 + 1).toBe(2);
  });

  test('Testing Library matchers should work', () => {
    const element = document.createElement('div');
    element.textContent = 'Hello World';
    
    // Append to document body so it's "in the document"
    document.body.appendChild(element);
    
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World');
    
    // Clean up
    document.body.removeChild(element);
  });
});