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
  beforeEach(function () {
    // Перехват запросов на получение ингредиентов
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
    cy.get('[data-cy=overlay]').should('exist').click('left', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('тест оформления заказа', function () {
  beforeEach(function() {
      // Перехват запросов на получение ингредиентов, данных пользователя и успешного заказа
      cy.intercept('GET', '/api/ingredients', {fixture: 'ingredients.json'});
      cy.intercept('GET', '/api/auth/user', {fixture: 'user.json'});
      cy.intercept('POST', '/api/orders', {fixture: 'newOrder.json'});
      
      //подставляем моковые токены, иначе неавторизовнанный пользователь не сможет сделать заказ
      window.localStorage.setItem(
          'refreshToken',
          JSON.stringify('test-refreshToken')
      );
      window.localStorage.setItem('accessToken', 'test-accessToken');
      cy.viewport(1300, 800);
      cy.visit('http://localhost:4000/');
    });


  afterEach(function () {
      cy.clearCookies();
      cy.clearLocalStorage();
  });
  
 it('тест создания заказа', function() {

  //собираем бургер
  cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
  cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
  cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
  cy.get('[data-cy=order-button]').contains('Оформить заказ').should('exist').click();
  
  //отправляем заказ
  cy.get('[data-cy=order-number]').contains('777777').should('exist');
  
  //закрываем окно с данными заказа
  cy.get('[data-cy=close-icon]').click();
  cy.get('[data-cy=modal]').should('not.exist');

  //проверяем, что конструктор пуст
  cy.get('[data-cy=constructor]').contains('Ингридиент 1').should('not.exist');
  cy.get('[data-cy=constructor]').contains('Ингридиент 2').should('not.exist');
  cy.get('[data-cy=constructor]').contains('Ингридиент 4').should('not.exist');
 });
});


