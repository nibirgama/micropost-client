import Router, { useRouter } from "next/router";

import React, { useEffect } from "react";

import { Button, Layout, Menu } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;


import {
    IdcardOutlined,
    PieChartOutlined,
    FundOutlined,
    HddOutlined,
    FormatPainterOutlined,
    ControlOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import Link from "next/link";


const MenuComponent = (props: { collapsed: boolean, defaultSelectedKeys: string, defaultOpenKeys?: string }) => {

    const router = useRouter();
    useEffect(() => {

    }, []);

    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}
            trigger={null} collapsible collapsed={props.collapsed} theme='light'>

            {props.collapsed ? (
                <div
                    onClick={() => { Router.push("/dashboard") }}
                    className="cursor logo mb-30" style={{ padding: 22 }}><img src="https://career.6sensehq.com/wp-content/uploads/2021/02/6sense-e1614422557371.png" style={{ width: '100%' }} /></div>

            ) : (
                <div
                    onClick={() => { Router.push("/dashboard") }}
                    className="cursor logo mb-30" style={{ padding: 22 }}><img src="https://career.6sensehq.com/wp-content/uploads/2021/02/6sense-e1614422557371.png" style={{ width: '50%' }} /></div>
            )}


            <Menu theme="light" mode="inline"
                defaultOpenKeys={[props.defaultOpenKeys !== undefined ? props.defaultOpenKeys : ""]}
                defaultSelectedKeys={[props.defaultSelectedKeys]}>


                <div className="mr-10 ml-10 mb-15">
                    {props.collapsed ? (
                        <>
                            {/* <Button block icon={<PlusCircleOutlined />} disabled type="default" onClick={() => { Router.push("/app/campaign/create_campaign"); }}></Button> */}
                            <Button block icon={<PlusCircleOutlined />} type="primary" onClick={() => { Router.push("/app/campaign/create_campaign"); }}></Button>
                        </>
                    ) : (
                        <>
                            <Button block icon={<PlusCircleOutlined />} type="primary" onClick={() => { Router.push("/app/campaign/create_campaign"); }}>Create Campaign</Button>
                            {/* <Button block icon={<PlusCircleOutlined />} disabled type="default" onClick={() => { Router.push("/app/campaign/create_campaign"); }}>Create Campaign</Button> */}
                        </>
                    )}

                </div>

                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    <Link href="/dashboard">Dashboard</Link>
                </Menu.Item>
                <SubMenu key="2" icon={<FundOutlined />} title="Campaign">
                    <Menu.Item key="22"><Link href="/campaign/stat">Stats</Link></Menu.Item>
                    <Menu.Item key="23"><Link href="/campaign/activity">Activity</Link></Menu.Item>
                    <Menu.Item disabled key="24"><Link href="/campaign/replies">Replies</Link></Menu.Item>
                    <Menu.Item key="25"><Link href="/campaign/invitations">Invitations</Link></Menu.Item>
                </SubMenu>
                <Menu.Item disabled key="3" icon={<HddOutlined />}>
                    <Link href="/templates">Templates</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<IdcardOutlined />}>
                    <Link href="/contacts">Contacts</Link>
                </Menu.Item>
                <Menu.Item disabled key="5" icon={<FormatPainterOutlined />}>
                    <Link href="/colortags">Color Tag</Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<ControlOutlined />}>
                    <Link href="/integrations">Integrations</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default MenuComponent