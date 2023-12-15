import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Проверка связаного списка', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/list');
  });

  it('Кнопка добавления в head/tail недоступна (Инпут пустой)', function() {
    cy.get('input').eq(0).should('be.empty');
    cy.get('button').contains('Добавить в head').parent().should('be.disabled');
    cy.get('button').contains('Добавить в tail').parent().should('be.disabled');
  });

  it('Кнопка добавления в head/tail доступна (Инпут заполнен)', function() {
    cy.get('input').eq(0).type("19");
    cy.get('button').contains('Добавить в head').parent().should('be.enabled');
    cy.get('button').contains('Добавить в tail').parent().should('be.enabled');
  });

  it('Кнопка добавления по индексу недоступна (Инпут пустой)', function() {
    cy.get('input').eq(1).should('be.empty');
    cy.get('button').contains('Добавить по индексу').parent().should('be.disabled');
    cy.get('button').contains('Удалить по индексу').parent().should('be.disabled');
  });

  it('Кнопка добавления по индексу доступна (Инпут заполнен)', function() {
    cy.get('input').eq(0).type("22");
    cy.get('input').eq(1).type(0);
    cy.get('button').contains('Добавить по индексу').parent().should('be.enabled');
    cy.get('button').contains('Удалить по индексу').parent().should('be.enabled');
  });

  it('Проверка отрисовки дефолтного списка', function() {
    cy.get('[class*=circle_content]').each(($el, index, array) => {
      if (index === 0) {
        cy.wrap($el).contains('head');
      }
      if (index === (array.length - 1)) {
        cy.wrap($el).contains('tail');
      }
      cy.wrap($el).children('[class*=circle_default]');
    });
  });
  it('Проверка добавления элемента в head', function() {
    cy.get('input').eq(0).type("4242");
    cy.get('button').contains('Добавить в head').click();

    cy.get('[class*=circle_content]').eq(0).contains('4242');
    cy.get('[class*=circle_content]').eq(0).children('[class*=circle_head]').children('[class*=circle_content]').children('[class*=circle_changing]');
    cy.get('[class*=circle_content]').eq(0).children('[class*=circle_default]');

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]').eq(0).contains('4242');
    cy.get('[class*=circle_content]').eq(0).contains('head');
    cy.get('[class*=circle_content]').eq(0).children('[class*=circle_default]');
  });
  it('Проверка добавления элемента в tail', function() {
    cy.get('input').eq(0).type("2121");
    cy.get('button').contains('Добавить в tail').click();

    cy.get('[class*=bottomContainer]').as("container");

    cy.get('[class*=circle_content]').last().contains('2121');
    cy.get('@container').children().last().children('[class*=circle_content]').children('[class*=circle_head]').children('[class*=circle_content]').children('[class*=circle_changing]');
    cy.get('[class*=circle_content]').last().children('[class*=circle_default]');

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]').last().contains('2121');
    cy.get('[class*=circle_content]').last().contains('tail');
    cy.get('[class*=circle_content]').last().children('[class*=circle_default]');
  });
  it('Проверка добавления по индексу', function() {
    cy.get('input').eq(0).type("4242");
    cy.get('input').eq(1).type("1");
    cy.get('button').contains('Добавить по индексу').click();

    cy.get('[class*=circle_content]').eq(0).contains('4242');
    cy.wait(DELAY_IN_MS);
    cy.get('[class*=circle_content]').eq(1).contains('4242');
    cy.wait(DELAY_IN_MS);
    cy.get('[class*=circle_content]').eq(1).children('[class*=circle_modified]');
    cy.get('[class*=circle_content]').eq(1).contains('4242');
  });
  
  it('Удаление элемента из head', function() {
    cy.get('input').eq(0).type("4242");
    cy.get('button').contains('Добавить в head').click();

    cy.get('[class*=circle_content]').eq(0).contains('4242');
    cy.get('[class*=circle_content]').eq(0).children('[class*=circle_head]').children('[class*=circle_content]').children('[class*=circle_changing]');
    cy.get('[class*=circle_content]').eq(0).children('[class*=circle_default]');

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]').eq(0).contains('4242');
    cy.get('[class*=circle_content]').eq(0).contains('head');
    cy.get('[class*=circle_content]').eq(0).children('[class*=circle_default]');

    cy.wait(DELAY_IN_MS);

    cy.get('button').contains('Удалить из head').click();

    cy.get('[class*=circle_content]').eq(0).contains('4242');
    cy.get('[class*=circle_content]').eq(0).children('[class*=circle_tail]').children('[class*=circle_content]').children('[class*=circle_changing]');
    cy.get('[class*=circle_content]').eq(0).children('[class*=circle_default]');

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]').eq(0).contains('4242').should('not.exist');
  });
  it('Удаление элемента из tail', function() {
    cy.get('input').eq(0).type("2121");
    cy.get('button').contains('Добавить в tail').click();

    cy.get('[class*=bottomContainer]').as("container");

    cy.get('@container').children().last().contains('2121');
    cy.get('@container').children().last().children('[class*=circle_content]').children('[class*=circle_head]').children('[class*=circle_content]').children('[class*=circle_changing]');

    cy.wait(DELAY_IN_MS);

    cy.get('@container').children().last().contains('2121');
    cy.get('@container').children().last().contains('tail');

    cy.wait(DELAY_IN_MS);

    cy.get('button').contains('Удалить из tail').click();

    cy.get('@container').last().contains('2121');
    cy.get('@container').children().last().children('[class*=circle_content]').children('[class*=circle_tail]').children('[class*=circle_content]').children('[class*=circle_changing]');

    cy.wait(DELAY_IN_MS);

    cy.get('@container').last().contains('2121').should('not.exist');
  });
  it('Проверка удаление по индексу', function() {
    cy.get('input').eq(0).type("4242");
    cy.get('input').eq(1).type("1");
    cy.get('button').contains('Добавить по индексу').click();

    cy.get('[class*=circle_content]').eq(0).contains('4242');
    cy.wait(DELAY_IN_MS);
    cy.get('[class*=circle_content]').eq(1).contains('4242');
    cy.wait(DELAY_IN_MS);
    cy.get('[class*=circle_content]').eq(1).children('[class*=circle_modified]');
    cy.get('[class*=circle_content]').eq(1).contains('4242');

    cy.wait(DELAY_IN_MS);
    cy.get('input').eq(1).type("1");
    cy.get('button').contains('Удалить по индексу').click();

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]').eq(0).children('[class*=circle_changing]');

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]').eq(1).children('[class*=circle_default]');

    cy.get('[class*=circle_content]').eq(1).contains('4242');
    cy.get('[class*=circle_content]').eq(1).children('[class*=circle_tail]').children('[class*=circle_content]').children('[class*=circle_changing]');
    cy.get('[class*=circle_content]').eq(1).children('[class*=circle_default]');

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]').eq(1).contains('4242').should('not.exist');
  });
}); 