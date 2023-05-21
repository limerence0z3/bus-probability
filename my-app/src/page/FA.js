import { Row, Col, Button, Input } from "antd";
import { useState } from "react";
import 'animate.css'
const { Search } = Input;

const App = (props) => {

    const [step, setStep] = useState(1)

    switch (step) {
        case 1:
            return (
                <Row className='luzcenter animate__animated animate__fadeIn'>
                    <Col span={24}>
                        <Search placeholder="請輸入縣市(例如:臺南市)" size='large' onSearch={() => setStep(step + 1)} />
                    </Col>
                </Row>
            )
        case 2:
            return (
                <Row className='luzcenter animate__animated animate__fadeIn'>
                    <Col span={24}>
                        <Search placeholder="請輸入地區(例如:三五甲)" size='large' onSearch={() => setStep(step + 1)} />
                    </Col>
                </Row>
            )
        default:
            return (
                <Button onClick={() => setStep(1)} >Add{step}</Button>
            )
    }
}

export default App