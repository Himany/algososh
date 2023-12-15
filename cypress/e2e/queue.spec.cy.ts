import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Проверка очереди', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/queue');
  });

  it('Кнопка заблокирована (Инпут пустой)', function() {
    cy.get('input').should('be.empty');
    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');
  });

  it('Кнопка разблокирована (Инпут заполнен)', function() {
    cy.get('input').type(5);
    cy.get('button').eq(1).should('be.enabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');
  });

  it('Проверка добавления элемента', () => {
    cy.get('input').type('19');
    cy.get('button').contains('Добавить').click();

    cy.get('[class*=circle_content]').first().as('firstElement');
    cy.get('@firstElement').children('[class*=circle_changing]');
    cy.get('@firstElement').contains('19');
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('tail');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@firstElement').children('[class*=circle_default]');

    cy.get('input').type('12');
    cy.get('button').contains('Добавить').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').should('have.length', 6).each(($el, index) => {
        if (index === 0) {
            cy.wrap($el).contains('19');
            cy.wrap($el).contains('head');
        }
        if (index === 1) {
            cy.wrap($el).contains('12');
            cy.wrap($el).contains('tail');
        }
    });
  });

  it('Проверка удаления элемента', () => {
    cy.get('input').type('19');
    cy.get('button').contains('Добавить').click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type('12');
    cy.get('button').contains('Добавить').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('button').contains('Удалить').click();

    cy.get('[class*=circle_content]').should('have.length', 6).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('19');
        cy.wrap($el).contains('head');
        cy.wrap($el).children('[class*=circle_changing]');
      }
      if (index === 1) {
        cy.wrap($el).contains('12');
        cy.wrap($el).contains('tail');
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').should('have.length', 6).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).children('[class*=circle_default]');
      }
      if (index === 1) {
        cy.wrap($el).contains('head');
        cy.wrap($el).contains('12');
        cy.wrap($el).contains('tail');
      }
    });
  });

  it('Проверка очиститки очереди', function() {
    cy.get('input').type(5);

    cy.get('button').eq(1).click();

    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');

    cy.wait(1);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(10);

    cy.get('button').eq(1).click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('button').eq(3).click();


    cy.get('[class*=circle_content]').should('have.length', 6).each(($el, index) => {
      cy.wrap($el).contains('head').should('not.exist');
      cy.wrap($el).contains('tail').should('not.exist');
    });
  });
}); 