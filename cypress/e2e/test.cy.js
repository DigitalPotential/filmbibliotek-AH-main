/**
 * Testsvit för navigeringsfunktionalitet.
 */
describe('Navigation', () => {
  /**
   * Testfall för att verifiera navigering till startsidan.
   * Den besöker rot-URL:en och kontrollerar om texten 'Home Page' är synlig.
   */
  it('ska navigera till startsidan', () => {
    cy.visit('/');
    cy.contains('Home Page').should('be.visible');
  });

  /**
   * Testfall för att verifiera navigering till favoritsidan.
   * Den besöker rot-URL:en, klickar på länken 'Favorites', 
   * och kontrollerar om URL:en innehåller '/favorites' och om texten 'Favorite Page' är synlig.
   */
  it('ska navigera till favoritsidan', () => {
    cy.visit('/');
    cy.contains('Favorites').click();
    cy.url().should('include', '/favorites');
    cy.contains('Favorite Page').should('be.visible');
  });
});
