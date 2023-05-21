import { useState } from 'react';
import { Row, Col, Input, Radio } from 'antd';
import Fa from './FA';
import Fb from './FB';
import 'animate.css';
const { Search } = Input;

const App = () => {

  const [option, setOption] = useState('small');
  const onChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <div className='luzcenter animate__animated animate__fadeIn' style={{ width: '36.7vh', height: '82vh', padding: '1vh', borderRadius: '20px', backgroundColor: 'whitesmoke', boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)' }}>
      <Row justify={'center'} gutter={[0, 10]} >
        <Col>
          <Radio.Group
            value={option}
            onChange={onChange}
            style={{
              marginBottom: 16,
            }}
          >
            <Radio.Button value="A">站別班次查詢</Radio.Button>
            <Radio.Button value="B">路線查詢</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={24}>
          <Row justify={'center'}>
            <Col span={24}>
              <FSwitch switch={option} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

const FSwitch = (props) => {

  switch (props.switch) {
    case 'A':
      return (
        <Row>
          <Col span={24}>
            <Fa />
          </Col>
        </Row>

      )
    case 'B':
      return (
        <Row>
          <Col span={24}>
            <Fb />
          </Col>
        </Row>
      )
    default:
      return (
        <Row>
          <Col span={24}>
            <Search
              placeholder="default"
              // onSearch={{}}
              size='large'
            />
          </Col>
        </Row>
      )
  }
}

const BusCard = (props) => {

  return (
    <Row wrap={false} style={{ padding: '1vh', borderRadius: '10px', width: '100%', background: '#5d6e86' }}>
      <Col flex='none'>
        <div style={{ fontSize: '48px', borderRadius: '10px', backgroundColor: '#ffffff', padding: '4px', color: '#250942' }}>A7</div>
      </Col>
      <Col flex='auto' style={{ color: '#ffffff', padding: '0px 1vh' }}>
        <div>
          {'dscjohjodchdjkloiokldcjl dchljcdhkjlchdkjlchkdjlchkldchlkdhckljdh'}
        </div>
      </Col>
    </Row>
  )
}


export default App;