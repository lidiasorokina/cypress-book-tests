describe('Тестирование приложения книг', () => {

  const email = 'bropet@mail.ru';
  const password = '123';

  beforeEach(() => {

    cy.visit('/');

  });

  it('должна отображаться главная страница с кнопкой входа', () => {

    cy.get('.btn-warning').should('exist');
  });

  it('должна отображаться форма авторизации', () => {

    cy.get('.btn-warning').click();

    cy.get('#mail').should('be.visible');
    cy.get('#pass').should('be.visible');

    cy.get('button[type="submit"]')
      .should('be.visible');
  });

  it('должна проходить авторизация с тестовым аккаунтом', () => {

    cy.get('.btn-warning').click();

    cy.get('#mail').type(email);
    cy.get('#pass').type(password);

    cy.get('button[type="submit"]').click();

    cy.contains('Log out')
      .should('be.visible');
  });

  it('можно добавить книгу в избранное', () => {

    // Логин
    cy.get('.btn-warning').click();

    cy.get('#mail').type(email);
    cy.get('#pass').type(password);

    cy.get('button[type="submit"]').click();

    // Открываем книгу
    cy.get('.card').first().click();

    // Проверяем страницу книги
    cy.url().should('include', '/book/');

    // Добавляем в избранное
    cy.contains(/favorite|избран/i)
      .click({ force: true });

    // Проверяем переход
    cy.url().should('include', '/favorites');

    // Проверяем наличие книги
    cy.get('.card')
      .its('length')
      .should('be.gte', 1);
  });

  it('можно удалить книгу из избранного', () => {

    // Логин
    cy.get('.btn-warning').click();

    cy.get('#mail').type(email);
    cy.get('#pass').type(password);

    cy.get('button[type="submit"]').click();

    // Открываем избранное
    cy.visit('/favorites');

    // Если пусто — добавляем книгу
    cy.get('body').then(($body) => {

      if ($body.find('.card').length === 0) {

        cy.visit('/');

        cy.get('.card').first().click();

        cy.contains(/favorite|избран/i)
          .click({ force: true });

        cy.visit('/favorites');
      }
    });

    // Открываем книгу
    cy.get('.card').first().click();

    // Удаляем из избранного
    cy.contains(/favorite|избран/i)
      .click({ force: true });

    // Проверяем возврат
    cy.url().should('include', '/favorites');
  });

});