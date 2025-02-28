/// <reference types = "cypress" />

describe('тест добавления ингредиентов в конструктор', function () {
  beforeEach(function () {
    // Перехват запросов на получение ингредиентов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('тест добавления булки', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains('Ингредиент 1').should('exist');
  });
});

describe('тест работы модальных окон', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('тест открытия модального окна с ингредиентом', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Ингредиент 1').click();
    cy.get('[data-cy=modal]').contains('Ингредиент 1').should('exist');
  });

  it('тест закрытия модального окна по клику на крест', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Ингредиент 1').click();
    cy.get('[data-cy=close-icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });


  it('тест закрытия модального окна по клику в оверлее', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Ингредиент 1').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=overlay]').should('exist').click('topRight', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

