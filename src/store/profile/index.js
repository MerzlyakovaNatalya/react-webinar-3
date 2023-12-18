import StoreModule from "../module";

/**
 * Информация о пользователе
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false 
    }
  }

  /**
   * Загрузка профиля
   * @return {Promise<void>}
   */
  async load() {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const response = await fetch(`/api/v1/users/self`, {
        headers: {
            'X-Token': this.store.getState().login.token
        }
    });
    const json = await response.json();

    this.setState({
      data: json.result,
      waiting: false
    }, 'Загружен профиль из API');
  }
}

export default ProfileState;