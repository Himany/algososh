import { DELAY_IN_MS } from '../../src/constants/delays';
import { circleContainer, bottomContainer, circleDefault, circleChanging, circleModified } from '../../src/constants/cypress';

describe('Проверка строки', function() {
  beforeEach(function() {
    cy.visit('/recursion');
  });

  it('Кнопка заблокирована (Инпут пустой)', function() {
    cy.get('input').should('be.empty');
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Кнопка разблокирована (Инпут заполнен)', function() {
    cy.get('input').type("test");
    cy.get('button').eq(1).should('be.enabled');
  });

  it('Проверка разворота строки', function() {
    const stringReverse = "test";

    cy.get('input').type(stringReverse);

    cy.get('button').eq(1).click();

    cy.get('button').eq(1).should('be.disabled');

    cy.wait(1);

    cy.get(bottomContainer).as("container");
    cy.get('@container').children().should('have.length', stringReverse.length);
    
    /*
    circle_modified
    circle_default
    circle_changing
    */

    //Значения
    cy.get('@container').children().eq(0).should('contain', 't');
    cy.get('@container').children().eq(1).should('contain', 'e');
    cy.get('@container').children().eq(2).should('contain', 's');
    cy.get('@container').children().eq(3).should('contain', 't');
    //Классы
    cy.get('@container').children().eq(0).children().eq(1).invoke('attr','class').should('match',/circle_changing/);
    cy.get('@container').children().eq(1).children().eq(1).invoke('attr','class').should('match',/circle_default/);
    cy.get('@container').children().eq(2).children().eq(1).invoke('attr','class').should('match',/circle_default/);
    cy.get('@container').children().eq(3).children().eq(1).invoke('attr','class').should('match',/circle_changing/);

    cy.wait(DELAY_IN_MS);

    //Значения
    cy.get('@container').children().eq(0).should('contain', 't');
    cy.get('@container').children().eq(1).should('contain', 'e');
    cy.get('@container').children().eq(2).should('contain', 's');
    cy.get('@container').children().eq(3).should('contain', 't');
    //Классы
    cy.get('@container').children().eq(0).children().eq(1).invoke('attr','class').should('match',/circle_modified/);
    cy.get('@container').children().eq(1).children().eq(1).invoke('attr','class').should('match',/circle_default/);
    cy.get('@container').children().eq(2).children().eq(1).invoke('attr','class').should('match',/circle_default/);
    cy.get('@container').children().eq(3).children().eq(1).invoke('attr','class').should('match',/circle_modified/);

    cy.wait(DELAY_IN_MS);

    //Значения
    cy.get('@container').children().eq(0).should('contain', 't');
    cy.get('@container').children().eq(1).should('contain', 'e');
    cy.get('@container').children().eq(2).should('contain', 's');
    cy.get('@container').children().eq(3).should('contain', 't');
    //Классы
    cy.get('@container').children().eq(0).children().eq(1).invoke('attr','class').should('match',/circle_modified/);
    cy.get('@container').children().eq(1).children().eq(1).invoke('attr','class').should('match',/circle_changing/);
    cy.get('@container').children().eq(2).children().eq(1).invoke('attr','class').should('match',/circle_changing/);
    cy.get('@container').children().eq(3).children().eq(1).invoke('attr','class').should('match',/circle_modified/);

    cy.wait(DELAY_IN_MS);

    //Значения
    cy.get('@container').children().eq(0).should('contain', 't');
    cy.get('@container').children().eq(1).should('contain', 's');
    cy.get('@container').children().eq(2).should('contain', 'e');
    cy.get('@container').children().eq(3).should('contain', 't');
    //Классы
    cy.get('@container').children().eq(0).children().eq(1).invoke('attr','class').should('match',/circle_modified/);
    cy.get('@container').children().eq(1).children().eq(1).invoke('attr','class').should('match',/circle_modified/);
    cy.get('@container').children().eq(2).children().eq(1).invoke('attr','class').should('match',/circle_modified/);
    cy.get('@container').children().eq(3).children().eq(1).invoke('attr','class').should('match',/circle_modified/);
  });
}); 