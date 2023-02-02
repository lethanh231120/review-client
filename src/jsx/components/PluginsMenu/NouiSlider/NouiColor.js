import React from 'react'
import Nouislider from 'nouislider-react'
import 'nouislider/distribute/nouislider.css'

const COLORS = ['red', 'green', 'blue']
const colors = [0, 0, 0]

class Colorpicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'rgb(127, 127, 127)',
      textValue: null,
      percent: null,
      value: 0,
      disabled: false,
      range: {
        min: 0,
        max: 100
      },
      ref: null
    }

    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate(index) {
    return function(render, handle, value, un, percent) {
      colors[index] = value[0]
      this.setState({ color: `rgb(${colors.join(',')})` })
    }
  }

  // onUpdate = (index) => (render, handle, value, un, percent) => {

  // }

  render() {
    const { color } = this.state
    return (
      <div className='slider' id='colorpicker'>
        {COLORS.map((item, index) => (
          <Nouislider
            key={item}
            id={item}
            start={127}
            connect={[true, false]}
            orientation='vertical'
            range={{
              min: 0,
              max: 255
            }}
            onUpdate={this.onUpdate(index)}
          />
        ))}
        <div id='result' style={{ background: color, color }} />
      </div>
    )
  }
}

export default Colorpicker
