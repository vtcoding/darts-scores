import styles from "./PageContent.module.css";

interface PageContentProps {
    children: React.ReactNode;
}

const PageContent = ({children}: PageContentProps) => {
    return (
      <div className={styles.pageContent}>
        <div className={styles.container}>
            {children}
        </div>
      </div>  
    );
}

export default PageContent;