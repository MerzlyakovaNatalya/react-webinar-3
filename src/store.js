import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addToBasket(code) {
    let sum = 0;
    let product = false;
    const list = this.getState().basket.list.map(item => {
      let copyItem = item;
      
      if (item.code === code) {
        product = true;
        copyItem = {...item, amount: item.amount + 1}
      }
      sum += copyItem.price * copyItem.amount;
      return copyItem;
    });

      if(!product) {
        const item = this.getState().list.find(item => item.code === code);
        list.push({...item, amount: 1});
        sum += item.price;
      }

      this.setState({
        ...this.state,
        basket: {
          ...this.state.basket,
          list,
          sum,
          amount: list.length
        }
      })
  }

  removeFromBasket(code) {
    let sum = 0;
    const list = this.getState().basket.list.filter(item => {
      if (item.code === code) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        list,
        sum,
        amount: list.length
      }
    });
  }
}

export default Store;
