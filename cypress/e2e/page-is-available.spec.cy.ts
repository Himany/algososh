describe('Service pages is available', function() {
  it('Page: recursion', function() {
    cy.visit('/recursion');
  });
  it('Page: fibonacci', function() {
    cy.visit('/fibonacci');
  });
  it('Page: sorting', function() {
    cy.visit('/sorting');
  });
  it('Page: stack', function() {
    cy.visit('/stack');
  });
  it('Page: queue', function() {
    cy.visit('/queue');
  });
  it('Page: list', function() {
    cy.visit('/list');
  });
}); 