import clsx from "clsx";
import styles from "./DoctorModel.module.css";

export type DoctorPose = "wave" | "clipboard" | "listen";

export interface DoctorModelProps {
  pose: DoctorPose;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
}

export function DoctorModel({
  pose,
  primaryColor,
  secondaryColor,
  accentColor,
  backgroundColor
}: DoctorModelProps) {
  return (
    <div
      className={clsx(styles.scene, {
        [styles.poseWave]: pose === "wave",
        [styles.poseClipboard]: pose === "clipboard",
        [styles.poseListen]: pose === "listen"
      })}
      style={{
        background: `radial-gradient(circle at 50% 10%, rgba(255,255,255,0.72), ${backgroundColor})`
      }}
    >
      <span className={styles.platform} />
      <div
        className={styles.doctor}
        style={
          {
            "--primary": primaryColor,
            "--secondary": secondaryColor,
            "--accent": accentColor
          } as React.CSSProperties
        }
      >
        <div className={styles.body}>
          <div className={styles.coat} />
          <div className={styles.stethoscope} />
          <div className={styles.badge} />
        </div>
        <div className={styles.face}>
          <div className={styles.hair} />
          <div className={styles.eyes}>
            <span className={styles.eye} />
            <span className={styles.eye} />
          </div>
          <div className={styles.mask} />
        </div>
        <div className={clsx(styles.arm, styles.armLeft)}>
          <span className={styles.hand} />
        </div>
        <div className={clsx(styles.arm, styles.armRight)}>
          <span className={clsx(styles.hand, styles.handRight)} />
        </div>
        <div className={styles.clipboard} />
        <div className={styles.legs}>
          <span className={styles.leg} />
          <span className={styles.leg} />
        </div>
      </div>
    </div>
  );
}
