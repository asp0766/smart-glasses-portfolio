import { motion } from 'framer-motion'

const code = `import cv2
import mediapipe as mp
import time

mp_face = mp.solutions.face_mesh
CLOSED_SEC = 4.5      # alert if eyes closed longer than this
EAR_OPEN = 0.22       # tune per camera / lighting

def eye_aspect_ratio(landmarks, idx_a, idx_b, idx_c, idx_d):
    # Simplified vertical / horizontal ratio for one eye
    v = ((landmarks[idx_a].y - landmarks[idx_b].y) ** 2) ** 0.5
    h = ((landmarks[idx_c].x - landmarks[idx_d].x) ** 2) ** 0.5
    return v / (h + 1e-6)

cap = cv2.VideoCapture(0)
closed_since = None

with mp_face.FaceMesh(max_num_faces=1) as mesh:
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        res = mesh.process(rgb)
        if res.multi_face_landmarks:
            lm = res.multi_face_landmarks[0].landmark
            ear = (eye_aspect_ratio(lm, 159, 145, 33, 133) +
                   eye_aspect_ratio(lm, 386, 374, 263, 362)) / 2
            if ear < EAR_OPEN:
                if closed_since is None:
                    closed_since = time.time()
                elif time.time() - closed_since >= CLOSED_SEC:
                    trigger_speaker_alert()   # ESP32 / GPIO / serial
            else:
                closed_since = None
`

export default function CodeSection() {
  return (
    <section id="code" className="scroll-mt-20 px-4 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Vision & timing logic
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            MediaPipe (or Haar cascades in OpenCV) gives stable landmarks; eye aspect ratio (EAR) separates
            open vs closed. A rolling timer fires only after{' '}
            <span className="font-medium text-cyan-600 dark:text-cyan-400">4–5 seconds</span> of continuous
            closure — reducing false positives from blinks.
          </p>
        </motion.div>

        <motion.div
          className="glass-panel overflow-hidden rounded-[1.75rem] border border-white/10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/80 px-4 py-3 dark:bg-slate-950/90">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Python</span>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-400">
              OpenCV · MediaPipe
            </span>
          </div>
          <pre className="code-block max-h-[min(70vh,520px)] overflow-auto p-5 text-left text-slate-200">
            <code>{code}</code>
          </pre>
        </motion.div>

        <motion.ul
          className="mt-8 grid gap-4 sm:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {[
            { t: 'OpenCV / MediaPipe', d: 'Robust face mesh & landmarks in varied lighting.' },
            { t: 'EAR threshold', d: 'Binary open/closed with tunable EAR for your rig.' },
            { t: 'Time gate', d: 'Must stay closed past 4–5 s to trigger hardware alert.' },
          ].map((item) => (
            <motion.li
              key={item.t}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="glass-panel rounded-2xl p-4 text-sm text-slate-600 dark:text-slate-400"
            >
              <p className="mb-1 font-semibold text-slate-900 dark:text-slate-100">{item.t}</p>
              <p>{item.d}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
