import { Row, Col, Button, Input } from "antd";
import { useState } from "react";
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
                        <Search placeholder="請輸入公車代碼(例如:TTT0981)" size='large' onSearch={() => setStep(step + 1)} />
                    </Col>
                </Row>
            )
        case 3:
            return (
                <Row className='luzcenter animate__animated animate__fadeIn'>
                    <Col span={24}>
                        <Search placeholder="請輸入數字(0:去程 1:返程 2:迴圈)" size='large' onSearch={() => setStep(step + 1)} />
                    </Col>
                </Row>
            )
        case 4:
            return (
                <Row className='luzcenter animate__animated animate__fadeIn'>
                    <Col span={24}>
                        <Search placeholder="請輸入要查詢的日(例如:15)" size='large' onSearch={() => setStep(step + 1)} />
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