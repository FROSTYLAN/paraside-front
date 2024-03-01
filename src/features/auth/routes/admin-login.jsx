import { LoginAdmin } from "../components/login-admin"

export const AdminLogin = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{width: "400px"}}>
                <LoginAdmin title="Administrador" buttonText="Ingresar" />
            </div>
        </div>
    )
}