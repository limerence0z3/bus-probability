import { Layout, ConfigProvider, Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';
import Findbus from './findbus.png'
const { Header, Content, Footer } = Layout;
const App = () => {
    return (
        <ConfigProvider
            theme={{
                "token": {
                    "colorPrimary": "#5d6e86",
                    "colorBgBase": "#f2f0f5",
                    "colorTextBase": "#250942",
                    "colorInfo": "#175cbb",
                    "colorError": "#fd6365",
                    "colorWarning": "#efb134",
                    "colorSuccess": "#78d24a",
                    "fontSize": 14,
                    "wireframe": false,
                    "borderRadius": 16
                }
            }}>
            <Layout className="layout" >
                <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff00', height: '8vh', justifyContent: 'center' }}>
                    {/* <Menu
                style={{ backgroundColor: '#ffffff00'}}
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(15).fill(null).map((_, index) => {
                        const key = index + 1;
                        return {
                            key,
                            label: `nav ${key}`,
                        };
                    })}
                /> */}
                    {/* <img src={Findbus} style={{height: '8vh'}}/> */}
                    <text style={{fontSize: '40px', fontWeight: '600'}}>Find Bus</text>
                </Header>
                <Content className='luzcenter' style={{ minHeight: '100%', height: '84vh', margin: '0px 1vh' }}>
                    <Outlet />
                </Content>
                <Footer style={{ backgroundColor: '#ffffff00', height: '8vh' }}>
                </Footer>
            </Layout>
        </ConfigProvider>
    );
};
export default App;