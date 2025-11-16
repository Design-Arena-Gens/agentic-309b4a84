"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import styles from "./page.module.css";
import { DoctorModel, DoctorPose } from "@/components/DoctorModel";
import clsx from "clsx";

type Palette = {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
};

const palettes: Palette[] = [
  {
    name: "Calm Sky",
    colors: {
      primary: "#3EA1F4",
      secondary: "#1C2C3F",
      accent: "#79E2C6",
      background: "#D2EDFC"
    }
  },
  {
    name: "Clinical Mint",
    colors: {
      primary: "#3DCEB5",
      secondary: "#28494F",
      accent: "#F7C35C",
      background: "#D4FFF4"
    }
  },
  {
    name: "Sunrise Ward",
    colors: {
      primary: "#F48B3E",
      secondary: "#1B2A3C",
      accent: "#4ED6FF",
      background: "#FFE3CF"
    }
  },
  {
    name: "Night Shift",
    colors: {
      primary: "#7C8CF7",
      secondary: "#161B34",
      accent: "#F983C4",
      background: "#E3E5FF"
    }
  }
];

const backgroundOptions = [
  {
    label: "Aqua Studio",
    value: "#B6E6FF"
  },
  {
    label: "Sterile White",
    value: "#F4F6FB"
  },
  {
    label: "Soft Coral",
    value: "#FFDCD1"
  },
  {
    label: "Evening Slate",
    value: "#C9D1FF"
  }
];

const poseOptions: Array<{
  pose: DoctorPose;
  label: string;
  caption: string;
}> = [
  {
    pose: "wave",
    label: "Welcoming Wave",
    caption: "Inviting intro shot"
  },
  {
    pose: "clipboard",
    label: "Clipboard Notes",
    caption: "Professional talking head"
  },
  {
    pose: "listen",
    label: "Vitals Check",
    caption: "Attentive patient care"
  }
];

export default function Page() {
  const [activePalette, setActivePalette] = useState(0);
  const [pose, setPose] = useState<DoctorPose>("wave");
  const [primaryColor, setPrimaryColor] = useState(palettes[0].colors.primary);
  const [secondaryColor, setSecondaryColor] = useState(
    palettes[0].colors.secondary
  );
  const [accentColor, setAccentColor] = useState(palettes[0].colors.accent);
  const [backgroundColor, setBackgroundColor] = useState(
    palettes[0].colors.background
  );

  const sceneRef = useRef<HTMLDivElement | null>(null);

  const handlePaletteSelect = useCallback((index: number) => {
    const selected = palettes[index];
    setActivePalette(index);
    setPrimaryColor(selected.colors.primary);
    setSecondaryColor(selected.colors.secondary);
    setAccentColor(selected.colors.accent);
    setBackgroundColor(selected.colors.background);
  }, []);

  const handleHexChange = useCallback(
    (value: string, setter: (color: string) => void) => {
      const normalized = value.startsWith("#") ? value : `#${value}`;
      if (/^#[0-9A-Fa-f]{0,6}$/.test(normalized)) {
        setter(normalized.toUpperCase());
      }
    },
    []
  );

  const handleDownload = useCallback(async () => {
    if (!sceneRef.current) return;

    const canvas = await html2canvas(sceneRef.current, {
      backgroundColor: null,
      scale: 3
    });

    const link = document.createElement("a");
    link.download = `doctor-model-${pose}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [pose]);

  const paletteInfo = useMemo(() => palettes[activePalette], [activePalette]);

  return (
    <main className={styles.page}>
      <motion.section
        className={styles.studio}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className={styles.meta}>{poseOptions.find((p) => p.pose === pose)?.label}</span>
        <div ref={sceneRef}>
          <DoctorModel
            pose={pose}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            accentColor={accentColor}
            backgroundColor={backgroundColor}
          />
        </div>
      </motion.section>

      <motion.aside
        className={styles.controls}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
      >
        <div className={styles.titleBlock}>
          <h1>Doctor Model Studio</h1>
          <p>
            Customize a ready-to-film medical hero for intros, explainers, and
            educational segments.
          </p>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Color Palettes</h2>
            <span>{paletteInfo.name}</span>
          </div>
          <div className={styles.swatchGrid}>
            {palettes.map((palette, index) => (
              <button
                key={palette.name}
                className={clsx(styles.swatch, {
                  [styles.swatchActive]: activePalette === index
                })}
                onClick={() => handlePaletteSelect(index)}
                aria-label={`Use ${palette.name} palette`}
              >
                <div className={styles.swatchRow}>
                  <span style={{ background: palette.colors.primary }} />
                  <span style={{ background: palette.colors.secondary }} />
                  <span style={{ background: palette.colors.accent }} />
                </div>
                <div className={styles.swatchLabel}>{palette.name}</div>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Fine-Tune Colors</h2>
            <span>Hex values supported</span>
          </div>
          <div className={styles.colorFields}>
            <div className={styles.colorField}>
              <span
                className={styles.colorPreview}
                style={{ background: primaryColor }}
              />
              <label>
                Primary
                <input
                  aria-label="Primary color hex"
                  value={primaryColor}
                  onChange={(event) =>
                    handleHexChange(event.target.value, setPrimaryColor)
                  }
                />
              </label>
            </div>
            <div className={styles.colorField}>
              <span
                className={styles.colorPreview}
                style={{ background: secondaryColor }}
              />
              <label>
                Secondary
                <input
                  aria-label="Secondary color hex"
                  value={secondaryColor}
                  onChange={(event) =>
                    handleHexChange(event.target.value, setSecondaryColor)
                  }
                />
              </label>
            </div>
            <div className={styles.colorField}>
              <span
                className={styles.colorPreview}
                style={{ background: accentColor }}
              />
              <label>
                Accent
                <input
                  aria-label="Accent color hex"
                  value={accentColor}
                  onChange={(event) =>
                    handleHexChange(event.target.value, setAccentColor)
                  }
                />
              </label>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Background</h2>
            <span>Scene ready</span>
          </div>
          <div className={styles.swatchGrid}>
            {backgroundOptions.map((option) => (
              <button
                key={option.label}
                className={clsx(styles.swatch, {
                  [styles.swatchActive]: backgroundColor === option.value
                })}
                onClick={() => setBackgroundColor(option.value)}
                aria-label={`Set background to ${option.label}`}
              >
                <div
                  className={styles.swatchRow}
                  style={{ borderRadius: 10, overflow: "hidden" }}
                >
                  <span
                    style={{ background: option.value, flex: 1, borderRadius: 10 }}
                  />
                </div>
                <div className={styles.swatchLabel}>{option.label}</div>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Pose Selector</h2>
            <span>3 options</span>
          </div>
          <div className={styles.poseList}>
            {poseOptions.map((option) => (
              <button
                key={option.pose}
                className={clsx(styles.poseButton, {
                  [styles.poseActive]: pose === option.pose
                })}
                onClick={() => setPose(option.pose)}
              >
                <strong>{option.label}</strong>
                <span className={styles.poseCaption}>{option.caption}</span>
              </button>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <button className={styles.cta} onClick={handleDownload}>
            Download PNG
          </button>
          <span className={styles.downloadNote}>
            Tip: Place the PNG into your editor and stack with backgrounds or
            motion graphics for your final video.
          </span>
        </footer>
      </motion.aside>
    </main>
  );
}
