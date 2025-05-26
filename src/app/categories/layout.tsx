const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="product-main">
            <div className="product-list">
                {children}
            </div>
        </div>
    );
}

export default Layout;