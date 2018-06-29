export default class PagePresenter {
  constructor(props, setState) {
    this.setState = setState
    this.updateProps(props)
  }

  updateProps(props) {
    this.inputProps = props
  }

  state(stateKey, data) {
    return new Proxy(data, {
      set: (target, key, value, receiver) => {
        let result = Reflect.set(target, key, value, receiver)
        this.setState({[stateKey]: target})
        return result
      }
    })
  }
}
