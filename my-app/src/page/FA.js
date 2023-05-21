import { Row, Col, Button, Input, Progress, Space, Popover } from "antd";
import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import 'animate.css'
const { Search } = Input;

const App = (props) => {

    const [step, setStep] = useState(1)

    switch (step) {
        case 1:
            return (
                <Row className='luzcenter animate__animated animate__fadeIn'>
                    <Col span={24}>
                        <Search key={1} placeholder="請輸入縣市(例如:臺南市)" size='large' onSearch={() => setStep(step + 1)} defaultValue={''} />
                    </Col>
                </Row>
            )
        case 2:
            return (
                <Row className='luzcenter animate__animated animate__fadeIn' gutter={[0, 10]}>
                    <Col span={24}>
                        <Search key={2} placeholder="請輸入站別名稱(例如:高師大燕巢校區)" size='large' onSearch={() => setStep(step + 1)} defaultValue={''} />
                    </Col>
                    <Col>
                        <Button onClick={() => setStep(1)} >上一步</Button>
                    </Col>
                </Row>
            )
        case 3:
            return (
                <Row className='luzcenter animate__animated animate__fadeIn' gutter={[0, 10]}>
                    <Col span={24}>
                        <Row style={{fontSize: '18px', fontWeight: '300',}} justify={'center'}>
                            <Space>
                                <div style={{padding: '3px 10px', backgroundColor:'#5d6e86', color: '#ffffff', borderRadius: '5px'}}>高雄市</div> 
                                <div style={{padding: '3px 10px', backgroundColor:'#5d6e86', color: '#ffffff', borderRadius: '5px'}}>高師大燕巢校區</div>
                            </Space>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <BusCard name='7A' start='高師大（燕巢）' end='加昌站' percent={90} />
                    </Col>
                    <Col span={24}>
                        <BusCard name='7A' start='加昌站' end='高師大（燕巢）' percent={70} />
                    </Col>
                    <Col span={24}>
                        <BusCard name='E04' end='高鐵左營站' percent={70} />
                    </Col>
                    <Col span={24}>
                        <BusCard name='E04' end='高師大燕巢校區' percent={70} />
                    </Col>
                    <Col>
                        <Button onClick={() => setStep(1)} >重新查詢</Button>
                    </Col>
                </Row>
            )
        default:
            return (
                <Button onClick={() => setStep(1)} >Add{step}</Button>
            )
    }
}

const BusCard = (props) => {

    return (
        <Popover content={<DemoArea/>} title="載客數">
            <Row wrap={false} style={{ padding: '1vh', borderRadius: '10px', width: '100%', background: '#5d6e86' }}>
                <Col flex='none'>
                    <div style={{ fontSize: '48px', borderRadius: '10px', backgroundColor: '#ffffff', padding: '4px', color: '#250942' }}>{props.name}</div>
                </Col>
                <Col flex='auto' style={{ color: '#ffffff', padding: '0px 1vh' }}>
                    <div style={{ overflow: 'hidden', fontSize: '16px', fontWeight: '500' }}>
                        <Space direction="vertical">
                            <text>往</text>
                            <text>{props.end}</text>
                        </Space>
                    </div>
                </Col>
                <Col flex={'none'}>
                    <Progress
                        type="circle"
                        percent={props.percent}
                        strokeColor={{
                            '0%': '#a16dbd',
                            '100%': '#6dbd96',
                        }}
                        size={64}
                    />
                </Col>
            </Row>
        </Popover>
    )
}

const DemoArea = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            range: [0, 1],
            tickCount: 5,
        },
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            };
        },
    };

    return <Area {...config} style={{height: '100px', width: '30vh'}} />;
};

export default App