import TextStepper from '@/components/TextStepper';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TextStepper />
      </div>
    </div>
  );
}
