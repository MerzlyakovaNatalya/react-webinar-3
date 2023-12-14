import StoreModule from "../module";

/**
 * Список категорий
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      list: [],
      waiting: false 
    }
  }

  /**
   * Загрузка списка категорий
   * @return {Promise<void>}
   */
  async load() {
    this.setState({
      list: [],
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();

      // Список категорий загружен успешно
      this.setState({
        list: json.result.items,
        waiting: false
      }, 'Загружен список категорий из АПИ');

    } catch (e) {
      this.setState({
        items: [],
        waiting: false
      });
    }
  }
}

export default CategoriesState;