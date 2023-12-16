import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { circleContainer, bottomContainer, circleDefault, circleChanging, circleModified } from '../../src/constants/cypress';

describe('Проверка связаного списка', function() {
  beforeEach(function() {
    cy.visit('/list');
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
    cy.get(circleContainer).each(($el, index, array) => {
      if (index === 0) {
        cy.wrap($el).contains('head');
      }
      if (index === (array.length - 1)) {
        cy.wrap($el).contains('tail');
      }
      cy.wrap($el).children(circleDefault);
    });
  });
  it('Проверка добавления элемента в head', function() {
    cy.get('input').eq(0).type("4242");
    cy.get('button').contains('Добавить в head').click();

    cy.get(circleContainer).eq(0).contains('4242');
    cy.get(circleContainer).eq(0).children('[class*=circle_head]').children(circleContainer).children(circleChanging);
    cy.get(circleContainer).eq(0).children(circleDefault);

    cy.wait(DELAY_IN_MS);

    cy.get(circleContainer).eq(0).contains('4242');
    cy.get(circleContainer).eq(0).contains('head');
    cy.get(circleContainer).eq(0).children(circleDefault);
  });
  it('Проверка добавления элемента в tail', function() {
    cy.get('input').eq(0).type("2121");
    cy.get('button').contains('Добавить в tail').click();

    cy.get(bottomContainer).as("container");

    cy.get(circleContainer).last().contains('2121');
    cy.get('@container').children().last().children(circleContainer).children('[class*=circle_head]').children(circleContainer).children(circleChanging);
    cy.get(circleContainer).last().children(circleDefault);

    cy.wait(DELAY_IN_MS);

    cy.get(circleContainer).last().contains('2121');
    cy.get(circleContainer).last().contains('tail');
    cy.get(circleContainer).last().children(circleDefault);
  });
  it('Проверка добавления по индексу', function() {
    cy.get('input').eq(0).type("4242");
    cy.get('input').eq(1).type("1");
    cy.get('button').contains('Добавить по индексу').click();

    cy.get(circleContainer).eq(0).contains('4242');
    cy.wait(DELAY_IN_MS);
    cy.get(circleContainer).eq(1).contains('4242');
    cy.wait(DELAY_IN_MS);
    cy.get(circleContainer).eq(1).children(circleModified);
    cy.get(circleContainer).eq(1).contains('4242');
  });
  
  it('Удаление элемента из head', function() {
    cy.get('input').eq(0).type("4242");
    cy.get('button').contains('Добавить в head').click();

    cy.get(circleContainer).eq(0).contains('4242');
    cy.get(circleContainer).eq(0).children('[class*=circle_head]').children(circleContainer).children(circleChanging);
    cy.get(circleContainer).eq(0).children(circleDefault);

    cy.wait(DELAY_IN_MS);

    cy.get(circleContainer).eq(0).contains('4242');
    cy.get(circleContainer).eq(0).contains('head');
    cy.get(circleContainer).eq(0).children(circleDefault);

    cy.wait(DELAY_IN_MS);

    cy.get('button').contains('Удалить из head').click();

    cy.get(circleContainer).eq(0).contains('4242');
    cy.get(circleContainer).eq(0).children('[class*=circle_tail]').children(circleContainer).children(circleChanging);
    cy.get(circleContainer).eq(0).children(circleDefault);

    cy.wait(DELAY_IN_MS);

    cy.get(circleContainer).eq(0).contains('4242').should('not.exist');
  });
  it('Удаление элемента из tail', function() {
    cy.get('input').eq(0).type("2121");
    cy.get('button').contains('Добавить в tail').click();

    cy.get(bottomContainer).as("container");

    cy.get('@container').children().last().contains('2121');
    cy.get('@container').children().last().children(circleContainer).children('[class*=circle_head]').children(circleContainer).children(circleChanging);

    cy.wait(DELAY_IN_MS);

    cy.get('@container').children().last().contains('2121');
    cy.get('@container').children().last().contains('tail');

    cy.wait(DELAY_IN_MS);

    cy.get('button').contains('Удалить из tail').click();

    cy.get('@container').last().contains('2121');
    cy.get('@container').children().last().children(circleContainer).children('[class*=circle_tail]').children(circleContainer).children(circleChanging);

    cy.wait(DELAY_IN_MS);

    cy.get('@container').last().contains('2121').should('not.exist');
  });
  it('Проверка удаление по индексу', function() {
    cy.get('input').eq(0).type("4242");
    cy.get('input').eq(1).type("1");
    cy.get('button').contains('Добавить по индексу').click();

    cy.get(circleContainer).eq(0).contains('4242');
    cy.wait(DELAY_IN_MS);
    cy.get(circleContainer).eq(1).contains('4242');
    cy.wait(DELAY_IN_MS);
    cy.get(circleContainer).eq(1).children(circleModified);
    cy.get(circleContainer).eq(1).contains('4242');

    cy.wait(DELAY_IN_MS);
    cy.get('input').eq(1).type("1");
    cy.get('button').contains('Удалить по индексу').click();

    cy.wait(DELAY_IN_MS);

    cy.get(circleContainer).eq(0).children(circleChanging);

    cy.wait(DELAY_IN_MS);

    cy.get(circleContainer).eq(1).children(circleDefault);

    cy.get(circleContainer).eq(1).contains('4242');
    cy.get(circleContainer).eq(1).children('[class*=circle_tail]').children(circleContainer).children(circleChanging);
    cy.get(circleContainer).eq(1).children(circleDefault);

    cy.wait(DELAY_IN_MS);

    cy.get(circleContainer).eq(1).contains('4242').should('not.exist');
  });
}); 