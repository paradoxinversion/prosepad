describe('ProsePad e2e', () => {
  it('creates a document via backend and loads frontend', () => {
    // create a document via backend API
    cy.request('POST', 'http://localhost:3000/docs', { title: 'E2E Doc', content: '<p>e2e</p>' })
      .its('status')
      .should('eq', 201);

    // visit the frontend (assumes vite dev server running on :5173 or built + preview)
    cy.visit('/');
    cy.contains('Start writing here...');
  });
});
