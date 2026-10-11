// ===== Currency selectors =====
// Components read the selected currency through these, so they do not depend on the state shape.

export const selectCurrency = (state) => state.currency.currency;
