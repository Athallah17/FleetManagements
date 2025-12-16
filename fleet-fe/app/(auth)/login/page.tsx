import AuthLayout from "@/components/auth/AuthLayout"
import LoginForm
 from "@/components/auth/LoginForm"
export default function LoginPage () {
    return (
        <AuthLayout
        type="login"
        title="Welcome back"
        subtitle="Login to continue"
        >
            <LoginForm />
        </AuthLayout>
    )
}