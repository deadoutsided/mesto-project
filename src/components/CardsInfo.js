import { config } from "../utils/util";
import { Api } from "./Api";

class CardsInfo extends Api {
  constructor(config, selectorProfileName, selectorProfileDescription) {
    super(config);
  }

  async getCards() {
    return await super._requireApi("/cards");
  }

  async postCard(cardName, cardImg) {
    return await super._requireApi(
      "/cards",
      { name: cardName, link: cardImg },
      "POST"
    );
  }

  async deleteCard(cardId) {
    return await super._requireApi(`/cards/${cardId}`, {}, "DELETE");
  }

  async likeCard(cardId) {
    return await super._requireApi(`/cards/likes/${cardId}`, {}, "PUT");
  }

  async deleteLikeCard(cardId) {
    return await super._requireApi(`/cards/likes/${cardId}`, {}, "DELETE");
  }
}

export const cardsInfo = new CardsInfo(config);