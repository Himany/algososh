describe('Service pages is available', function() {
  it('Page: recursion', function() {
    cy.visit('http://localhost:3000/recursion');
  });
  it('Page: fibonacci', function() {
    cy.visit('http://localhost:3000/fibonacci');
  });
  it('Page: sorting', function() {
    cy.visit('http://localhost:3000/sorting');
  });
  it('Page: stack', function() {
    cy.visit('http://localhost:3000/stack');
  });
  it('Page: queue', function() {
    cy.visit('http://localhost:3000/queue');
  });
  it('Page: list', function() {
    cy.visit('http://localhost:3000/list');
  });
}); 