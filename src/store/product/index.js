import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      data: {},
      loading: false
    }
  }

  async load(id) {
    this.setState({
      data: {},
      loading: true
    });

    try{
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json();
    
        this.setState({
           data: json.result,
           loading: false
        }, 'Загружен товар из АПИ по id');
    } catch (e) {
        this.setState({
        data: {},
        loading: false
      });
    }
  }
}

export default Product;