import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Content, Footer } = Layout;
const App = () => {
    return (
        <Layout className="layout">
            <Header style={{ display: 'flex', alignItems: 'center', }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(15).fill(null).map((_, index) => {
                        const key = index + 1;
                        return {
                            key,
                            label: `nav ${key}`,
                        };
                    })}
                />
            </Header>
            <Content>
                <Outlet />
            </Content>
            <Footer>
                Footer
            </Footer>
        </Layout>
    );
};
export default App;