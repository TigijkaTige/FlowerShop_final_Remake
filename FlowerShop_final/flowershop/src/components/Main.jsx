function Main({ children }) {
    return (
        <main className="flex-grow-1">
            <div className="container">{children}</div>
        </main>
    );
}

export default Main;
