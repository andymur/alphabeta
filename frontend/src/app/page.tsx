import styles from "./page.module.css";
import 'antd/dist/reset.css';
import Header from '@components/Header';
import Footer from "@components/Footer";
import UserAuthForm from "@components/UserAuthForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header/>
        <UserAuthForm/>
      </main>
      <Footer/>
    </div>
  );
}
