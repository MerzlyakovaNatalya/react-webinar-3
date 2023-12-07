import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10
      },
      count: 0,
      loading: false
    }
  }

  async load(newParams = {}) {
    const params = {...this.getState().params, ...newParams}

    this.setState({
      ...this.getState(),
      params,
      loading: true
    }, 'Установлены параметры');

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
    };

    const response =  await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      loading: false
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
