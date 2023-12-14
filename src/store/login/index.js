import StoreModule from "../module";

/**
 * Информация об авторизации.
 */
class LoginState extends StoreModule {

  initState() {
    return {
      user: {},
      token: null,
      error: null,
      status: false,
      waiting: false
    }
  }

  /**
   * @param data
   * Авторизация пользователя
   */
  async signIn(data) {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true
    });
    
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });

      const json = await response.json();

      if (response.status === 200) {
        this.setState({
          ...this.getState(),
          token: json.result.token,
          status: true,
          user: json.result.user,
          waiting: false
        }, 'Авторизация прошла успешно');

        localStorage.setItem('token', json.result.token)
      } else {
        const errorMessage = json.error.data.issues[0].message;
        throw new Error(errorMessage);
      }

    } catch (err) {
      this.setState({
        ...this.getState(),
        error: err.message,
        waiting: false
      }, 'Авторизация не удалась');
    }
  }

  /**
   * Проверка авторизации
   */
  async checkAuth() {
    const token = localStorage.getItem('token');

    if(token) {
      this.setState({
        ...this.getState(),
        waiting: true
      });
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': `${token}`
        }
      });
      const json = await response.json();

      if(json.error) {
        localStorage.removeItem('token') ;
        this.setState({
          ...this.getState(),
          status: false,
          waiting: false,
          token: null
        });
      } else {
        this.setState({
          ...this.getState(),
          token: token,
          user: json.result,
          status: true,
          waiting: false
        });
      }
    }
  }

  /**
   * Отмена авторизации
   */
  async signOut() {

    const token = this.getState().token;

    await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${token}`
      }
    })

    this.setState({
      token: null,
      status: false,
      user: {},
      error: null,
      waiting: false
    });
  }

//   /**
//    * Сброс состояния login (сброс ошибки)
//    */
//   reset() {
//     this.setState({
//       ...this.getState(),
//       error: '',
//     }, 'Состояние авторизации сброшено (сброс значения ошибки)');
//   }
}

export default LoginState;