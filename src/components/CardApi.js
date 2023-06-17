import { config } from "../utils/constants";
import { Api } from "./Api";

class CardApi extends Api {
  constructor(config, selectorProfileName, selectorProfileDescription) {
    super(config);
  }

  async getCards() {
    return await super.requireApi("/cards");
  }

  async postCard(cardName, cardImg) {
    return await super.requireApi(
      "/cards",
      { name: cardName, link: cardImg },
      "POST"
    );
  }

  async deleteCard(cardId) {
    return await super.requireApi(`/cards/${cardId}`, {}, "DELETE");
  }

  async likeCard(cardId) {
    return await super.requireApi(`/cards/likes/${cardId}`, {}, "PUT");
  }

  async deleteLikeCard(cardId) {
    return await super.requireApi(`/cards/likes/${cardId}`, {}, "DELETE");
  }
}

export const cardsInfo = new CardApi(config);
