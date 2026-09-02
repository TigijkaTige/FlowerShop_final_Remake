function AdminProtected({ children }) {
    const currentUser = useSelector((state) => state.auth.currentUser);
    return <>{currentUser.role === "Administrator" && children}</>;
}

export default AdminProtected;