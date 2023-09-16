import TextField from "@mui/material/TextField";
import styles from "./styles.module.css";
import AdminLoginForm from "@/components/AdminLoginForm";
const adminLogin = () => {
	return (
		<>
			<div className={styles.login_box}>
				<h2>Login</h2>
				<AdminLoginForm />
			</div>
		</>
	);
};

export default adminLogin;
