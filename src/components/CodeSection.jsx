import { motion } from 'framer-motion'

const code = `import cv2
import mediapipe as mp
import time
import math
import threading
import winsound

# -------- SOUND FUNCTION --------
def play_alert():
    winsound.Beep(1500, 1000)  # frequency, duration


# -------- MEDIAPIPE SETUP --------
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(refine_landmarks=True)

# Eye landmark indices
LEFT_EYE = [33, 160, 158, 133, 153, 144]
RIGHT_EYE = [362, 385, 387, 263, 373, 380]

# -------- EAR FUNCTION --------
def eye_aspect_ratio(eye):
    def dist(p1, p2):
        return math.hypot(p1.x - p2.x, p1.y - p2.y)

    A = dist(eye[1], eye[5])
    B = dist(eye[2], eye[4])
    C = dist(eye[0], eye[3])

    return (A + B) / (2.0 * C)


# -------- CAMERA --------
cap = cv2.VideoCapture(0)

closed_start_time = None
THRESHOLD = 0.25   # EAR threshold
TIME_LIMIT = 4     # seconds

alert_played = False  # to avoid continuous beep

print("Camera started... Press ESC to exit.")

# -------- MAIN LOOP --------
while True:
    ret, frame = cap.read()
    if not ret:
        print("Camera not working!")
        break

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = face_mesh.process(rgb)

    if result.multi_face_landmarks:
        for face_landmarks in result.multi_face_landmarks:

            # Get eye points
            left_eye = [face_landmarks.landmark[i] for i in LEFT_EYE]
            right_eye = [face_landmarks.landmark[i] for i in RIGHT_EYE]

            left_ear = eye_aspect_ratio(left_eye)
            right_ear = eye_aspect_ratio(right_eye)

            ear = (left_ear + right_ear) / 2.0

            # Display EAR
            cv2.putText(frame, f"EAR: {ear:.2f}", (30, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,255,0), 2)

            # -------- EYE CLOSED DETECTION --------
            if ear < THRESHOLD:
                if closed_start_time is None:
                    closed_start_time = time.time()
                    alert_played = False

                elapsed = time.time() - closed_start_time

                cv2.putText(frame, f"Closed: {elapsed:.1f}s",
                            (30, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,255), 2)

                # -------- ALERT --------
                if elapsed >= TIME_LIMIT:
                    cv2.putText(frame, "ALERT! WAKE UP!",
                                (30, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 3)

                    if not alert_played:
                        threading.Thread(target=play_alert).start()
                        alert_played = True

            else:
                closed_start_time = None
                alert_played = False

    cv2.imshow("Drowsiness Detection", frame)

    # ESC to exit
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()
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
