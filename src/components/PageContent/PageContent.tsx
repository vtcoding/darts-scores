import { useState, type ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./PageContent.module.css";
import Header from "../Header/Header";
import Drawer from '@mui/material/Drawer';

interface PageContentProps {
    headerTitle: string;
    children: ReactNode;
}

const PageContent = ({ headerTitle, children }: PageContentProps) => {
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

    return (
        <div className={styles.pageContent}>
            {
                sidebarVisible &&
                <Drawer className={styles.mobileSidebar} open={sidebarVisible} onClose={() => setSidebarVisible(false)}>
                    <Sidebar />
                </Drawer>
            }
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.container}>
                <Header toggleSidebar={() => setSidebarVisible(sidebarVisible ? false : true)} title={headerTitle} />
                <div className={styles.blocks}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageContent;