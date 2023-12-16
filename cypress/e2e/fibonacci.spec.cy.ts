import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { circleContainer, bottomContainer } from '../../src/constants/cypress';

describe('Проверка Фибоначчи', function() {
  beforeEach(function() {
    cy.visit('/fibonacci');
  });

  it('Кнопка заблокирована (Инпут пустой)', function() {
    cy.get('input').should('be.empty');
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Кнопка разблокирована (Инпут заполнен)', function() {
    cy.get('input').type(5);
    cy.get('button').eq(1).should('be.enabled');
  });

  it('Проверка генерации чисел', function() {
    cy.get('input').type(5);

    cy.get('button').eq(1).click();

    cy.get('button').eq(1).should('be.disabled');

    cy.wait(1);

    cy.get(bottomContainer).as("container");

    cy.get('@container').children().should('have.length', 1);
    cy.get('@container').children().eq(0).should('contain', '1');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@container').children().should('have.length', 2);
    cy.get('@container').children().eq(0).should('contain', '1');
    cy.get('@container').children().eq(1).should('contain', '1');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@container').children().should('have.length', 3);
    cy.get('@container').children().eq(0).should('contain', '1');
    cy.get('@container').children().eq(1).should('contain', '1');
    cy.get('@container').children().eq(2).should('contain', '2');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@container').children().should('have.length', 4);
    cy.get('@container').children().eq(0).should('contain', '1');
    cy.get('@container').children().eq(1).should('contain', '1');
    cy.get('@container').children().eq(2).should('contain', '2');
    cy.get('@container').children().eq(3).should('contain', '3');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@container').children().should('have.length', 5);
    cy.get('@container').children().eq(0).should('contain', '1');
    cy.get('@container').children().eq(1).should('contain', '1');
    cy.get('@container').children().eq(2).should('contain', '2');
    cy.get('@container').children().eq(3).should('contain', '3');
    cy.get('@container').children().eq(4).should('contain', '5');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@container').children().should('have.length', 6);
    cy.get('@container').children().eq(0).should('contain', '1');
    cy.get('@container').children().eq(1).should('contain', '1');
    cy.get('@container').children().eq(2).should('contain', '2');
    cy.get('@container').children().eq(3).should('contain', '3');
    cy.get('@container').children().eq(4).should('contain', '5');
    cy.get('@container').children().eq(5).should('contain', '8');
  });
}); 