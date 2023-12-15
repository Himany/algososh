import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Проверка стека', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/stack');
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

  it('Проверка добавления элемента в стек', function() {
    //Добавляем элемент 1
    cy.get('input').type(5);

    cy.get('button').eq(1).click();

    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');

    cy.wait(1);

    cy.get('[class*=bottomContainer]').as("container");

    cy.get('@container').children().should('have.length', 1);
    cy.get('@container').children().eq(0).should('contain', 5);
    cy.get('@container').children().eq(0).children().eq(1).invoke('attr','class').should('match',/circle_changing/);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@container').children().eq(0).children().eq(1).invoke('attr','class').should('match',/circle_default/);

    //Добавляем элемент 2
    cy.get('input').type(10);

    cy.get('button').eq(1).click();

    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');

    cy.wait(1);

    cy.get('@container').children().should('have.length', 2);

    cy.get('@container').children().eq(0).should('contain', 5);
    cy.get('@container').children().eq(0).children().eq(1).invoke('attr','class').should('match',/circle_default/);

    cy.get('@container').children().eq(1).should('contain', 10);
    cy.get('@container').children().eq(1).children().eq(1).invoke('attr','class').should('match',/circle_changing/);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@container').children().eq(1).children().eq(1).invoke('attr','class').should('match',/circle_default/);
  });

  it('Проверка удаления элемента из стека', function() {
    cy.get('input').type(5);

    cy.get('button').eq(1).click();

    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');

    cy.wait(1);

    cy.get('[class*=bottomContainer]').as("container");
    
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(10);

    cy.get('button').eq(1).click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@container').children().eq(0).should('contain', 5);
    cy.get('@container').children().eq(0).children().eq(1).invoke('attr','class').should('match',/circle_default/);

    cy.get('@container').children().eq(1).should('contain', 10);
    cy.get('@container').children().eq(1).children().eq(1).invoke('attr','class').should('match',/circle_default/);

    cy.get('button').eq(2).click();

    cy.get('@container').children().eq(0).should('contain', 5);
    cy.get('@container').children().eq(0).children().eq(1).invoke('attr','class').should('match',/circle_default/);

    cy.get('@container').children().eq(1).should('contain', 10);
    cy.get('@container').children().eq(1).children().eq(1).invoke('attr','class').should('match',/circle_changing/);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@container').children().should('have.length', 1);

    cy.get('@container').children().eq(0).should('contain', 5);
    cy.get('@container').children().eq(0).children().eq(1).invoke('attr','class').should('match',/circle_default/);
  });

  it('Проверка очиститки стека', function() {
    cy.get('input').type(5);

    cy.get('button').eq(1).click();

    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');

    cy.wait(1);

    cy.get('[class*=bottomContainer]').as("container");
    
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(10);

    cy.get('button').eq(1).click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('button').eq(3).click();

    cy.get('@container').children().should('have.length', 0);
  });
}); 