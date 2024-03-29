/*

ANIMOTION - Romeo Bhuiyan, Chrsitoph Lasinger

*/

//Importing libraries
const remap = Kalidokit.Utils.remap;
const clamp = Kalidokit.Utils.clamp;
const lerp = Kalidokit.Vector.lerp;

let currentVrm;

// render with WebGLRenderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// set up the camera (the size of the window needs to be revised) due to the size of the screen and quality of the camera
const orbitCamera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
orbitCamera.position.set(0.0, 1.4, 0.7);

// control the model with the camera
const orbitControls = new THREE.OrbitControls(orbitCamera, renderer.domElement);
orbitControls.screenSpacePanning = true;
orbitControls.target.set(0.0, 1.4, 0.0);
orbitControls.update();

// setting up the scene with three.js
const scene = new THREE.Scene();

// lighting for the model on canvas
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1.0, 1.0, 1.0).normalize();
scene.add(light);

// Looping the process
const clock = new THREE.Clock();

//adding physics to the model
function animate() {
  requestAnimationFrame(animate);

  if (currentVrm) {
    currentVrm.update(clock.getDelta());
  }
  renderer.render(scene, orbitCamera);
}
animate();

// VRM Loader
const loader = new THREE.GLTFLoader();
loader.crossOrigin = "anonymous";
// importing model from glitch.io our repo for storing the models
loader.load(
  window.localStorage.getItem("vrm"),
  (gltf) => {
    THREE.VRMUtils.removeUnnecessaryJoints(gltf.scene);

    // set the model infornt of user
    THREE.VRM.from(gltf).then((vrm) => {
      scene.add(vrm.scene);
      currentVrm = vrm;
      currentVrm.scene.rotation.y = Math.PI;
    });
  },

  (progress) =>
    console.log(
      "Loading model...",
      100.0 * (progress.loaded / progress.total),
      "%"
    ),

  (error) => console.error(error)
);

// rotate the model on canvas
const rigRotation = (
  name,
  rotation = { x: 0, y: 0, z: 0 },
  dampener = 1,
  lerpAmount = 0.3
) => {
  if (!currentVrm) {
    return;
  }
  const Part = currentVrm.humanoid.getBoneNode(
    THREE.VRMSchema.HumanoidBoneName[name]
  );
  if (!Part) {
    return;
  }

  let euler = new THREE.Euler(
    rotation.x * dampener,
    rotation.y * dampener,
    rotation.z * dampener
  );
  let quaternion = new THREE.Quaternion().setFromEuler(euler);
  Part.quaternion.slerp(quaternion, lerpAmount);
};

// position of the model
const rigPosition = (
  name,
  position = { x: 0, y: 0, z: 0 },
  dampener = 1,
  lerpAmount = 0.3
) => {
  if (!currentVrm) {
    return;
  }
  const Part = currentVrm.humanoid.getBoneNode(
    THREE.VRMSchema.HumanoidBoneName[name]
  );
  if (!Part) {
    return;
  }
  let vector = new THREE.Vector3(
    position.x * dampener,
    position.y * dampener,
    position.z * dampener
  );
  Part.position.lerp(vector, lerpAmount);
};

let oldLookTarget = new THREE.Euler();
const rigFace = (riggedFace) => {
  if (!currentVrm) {
    return;
  }
  rigRotation("Neck", riggedFace.head, 0.7);

  const Blendshape = currentVrm.blendShapeProxy;
  const PresetName = THREE.VRMSchema.BlendShapePresetName;

  // VRM Test for the eyes (considering blinking)
  riggedFace.eye.l = lerp(
    clamp(1 - riggedFace.eye.l, 0, 1),
    Blendshape.getValue(PresetName.Blink),
    0.5
  );
  riggedFace.eye.r = lerp(
    clamp(1 - riggedFace.eye.r, 0, 1),
    Blendshape.getValue(PresetName.Blink),
    0.5
  );
  riggedFace.eye = Kalidokit.Face.stabilizeBlink(
    riggedFace.eye,
    riggedFace.head.y
  );
  Blendshape.setValue(PresetName.Blink, riggedFace.eye.l);

  // Mouth motion
  Blendshape.setValue(
    PresetName.I,
    lerp(riggedFace.mouth.shape.I, Blendshape.getValue(PresetName.I), 0.5)
  );
  Blendshape.setValue(
    PresetName.A,
    lerp(riggedFace.mouth.shape.A, Blendshape.getValue(PresetName.A), 0.5)
  );
  Blendshape.setValue(
    PresetName.E,
    lerp(riggedFace.mouth.shape.E, Blendshape.getValue(PresetName.E), 0.5)
  );
  Blendshape.setValue(
    PresetName.O,
    lerp(riggedFace.mouth.shape.O, Blendshape.getValue(PresetName.O), 0.5)
  );
  Blendshape.setValue(
    PresetName.U,
    lerp(riggedFace.mouth.shape.U, Blendshape.getValue(PresetName.U), 0.5)
  );

  //Pupils and Eye Rotation
  let lookTarget = new THREE.Euler(
    lerp(oldLookTarget.x, riggedFace.pupil.y, 0.4),
    lerp(oldLookTarget.y, riggedFace.pupil.x, 0.4),
    0,
    "XYZ"
  );
  oldLookTarget.copy(lookTarget);
  currentVrm.lookAt.applyer.lookAt(lookTarget);
};

// VRM Character Animation Loop
const animateVRM = (vrm, results) => {
  if (!vrm) {
    return;
  }
  //Holistic lib returns a lot of data, we only need a few of them
  let riggedPose, riggedLeftHand, riggedRightHand, riggedFace;

  const faceLandmarks = results.faceLandmarks;
  const pose3DLandmarks = results.ea;
  const pose2DLandmarks = results.poseLandmarks;
  const leftHandLandmarks = results.rightHandLandmarks;
  const rightHandLandmarks = results.leftHandLandmarks;

  // Animate Face and Pupils
  if (faceLandmarks) {
    riggedFace = Kalidokit.Face.solve(faceLandmarks, {
      runtime: "mediapipe",
      video: videoElement,
    });
    rigFace(riggedFace);
  }

  // animate the rest of the body (mirrored)
  if (pose2DLandmarks && pose3DLandmarks) {
    riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
      runtime: "mediapipe",
      video: videoElement,
    });
    rigRotation("Hips", riggedPose.Hips.rotation, 0.7);
    rigPosition(
      "Hips",
      {
        x: -riggedPose.Hips.position.x,
        y: riggedPose.Hips.position.y + 1,
        z: -riggedPose.Hips.position.z,
      },
      1,
      0.07
    );

    rigRotation("Chest", riggedPose.Spine, 0.25, 0.3);
    rigRotation("Spine", riggedPose.Spine, 0.45, 0.3);

    rigRotation("RightUpperArm", riggedPose.RightUpperArm, 1, 0.3);
    rigRotation("RightLowerArm", riggedPose.RightLowerArm, 1, 0.3);
    rigRotation("LeftUpperArm", riggedPose.LeftUpperArm, 1, 0.3);
    rigRotation("LeftLowerArm", riggedPose.LeftLowerArm, 1, 0.3);

    rigRotation("LeftUpperLeg", riggedPose.LeftUpperLeg, 1, 0.3);
    rigRotation("LeftLowerLeg", riggedPose.LeftLowerLeg, 1, 0.3);
    rigRotation("RightUpperLeg", riggedPose.RightUpperLeg, 1, 0.3);
    rigRotation("RightLowerLeg", riggedPose.RightLowerLeg, 1, 0.3);
  }

  // Animate Hands (left)
  if (leftHandLandmarks) {
    riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left");
    rigRotation("LeftHand", {
      z: riggedPose.LeftHand.z,
      y: riggedLeftHand.LeftWrist.y,
      x: riggedLeftHand.LeftWrist.x,
    });
    rigRotation("LeftRingProximal", riggedLeftHand.LeftRingProximal);
    rigRotation("LeftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
    rigRotation("LeftRingDistal", riggedLeftHand.LeftRingDistal);
    rigRotation("LeftIndexProximal", riggedLeftHand.LeftIndexProximal);
    rigRotation("LeftIndexIntermediate", riggedLeftHand.LeftIndexIntermediate);
    rigRotation("LeftIndexDistal", riggedLeftHand.LeftIndexDistal);
    rigRotation("LeftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
    rigRotation(
      "LeftMiddleIntermediate",
      riggedLeftHand.LeftMiddleIntermediate
    );
    rigRotation("LeftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
    rigRotation("LeftThumbProximal", riggedLeftHand.LeftThumbProximal);
    rigRotation("LeftThumbIntermediate", riggedLeftHand.LeftThumbIntermediate);
    rigRotation("LeftThumbDistal", riggedLeftHand.LeftThumbDistal);
    rigRotation("LeftLittleProximal", riggedLeftHand.LeftLittleProximal);
    rigRotation(
      "LeftLittleIntermediate",
      riggedLeftHand.LeftLittleIntermediate
    );
    rigRotation("LeftLittleDistal", riggedLeftHand.LeftLittleDistal);
  }

  // Animate Hands (right)
  if (rightHandLandmarks) {
    riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right");
    rigRotation("RightHand", {
      z: riggedPose.RightHand.z,
      y: riggedRightHand.RightWrist.y,
      x: riggedRightHand.RightWrist.x,
    });
    rigRotation("RightRingProximal", riggedRightHand.RightRingProximal);
    rigRotation("RightRingIntermediate", riggedRightHand.RightRingIntermediate);
    rigRotation("RightRingDistal", riggedRightHand.RightRingDistal);
    rigRotation("RightIndexProximal", riggedRightHand.RightIndexProximal);
    rigRotation(
      "RightIndexIntermediate",
      riggedRightHand.RightIndexIntermediate
    );
    rigRotation("RightIndexDistal", riggedRightHand.RightIndexDistal);
    rigRotation("RightMiddleProximal", riggedRightHand.RightMiddleProximal);
    rigRotation(
      "RightMiddleIntermediate",
      riggedRightHand.RightMiddleIntermediate
    );
    rigRotation("RightMiddleDistal", riggedRightHand.RightMiddleDistal);
    rigRotation("RightThumbProximal", riggedRightHand.RightThumbProximal);
    rigRotation(
      "RightThumbIntermediate",
      riggedRightHand.RightThumbIntermediate
    );
    rigRotation("RightThumbDistal", riggedRightHand.RightThumbDistal);
    rigRotation("RightLittleProximal", riggedRightHand.RightLittleProximal);
    rigRotation(
      "RightLittleIntermediate",
      riggedRightHand.RightLittleIntermediate
    );
    rigRotation("RightLittleDistal", riggedRightHand.RightLittleDistal);
  }
};

// holistic lib
let videoElement = document.querySelector(".input_video"),
  guideCanvas = document.querySelector("canvas.guides");

const onResults = (results) => {
  // Draw face marks
  drawResults(results);
  // animate the model
  animateVRM(currentVrm, results);
};

const holistic = new Holistic({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/${file}`;
  },
});

holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7,
  refineFaceLandmarks: true,
});
holistic.onResults(onResults);

// drawing the face marks on the canvas
const drawResults = (results) => {
  guideCanvas.width = videoElement.videoWidth;
  guideCanvas.height = videoElement.videoHeight;
  let canvasCtx = guideCanvas.getContext("2d");
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, guideCanvas.width, guideCanvas.height);
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
    color: "#a640ff",
    lineWidth: 4,
  });
  drawLandmarks(canvasCtx, results.poseLandmarks, {
    color: "#f67d92",
    lineWidth: 2,
  });
  drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
    color: "#fcd4db",
    lineWidth: 1,
  });
  if (results.faceLandmarks && results.faceLandmarks.length === 478) {
    drawLandmarks(
      canvasCtx,
      [results.faceLandmarks[468], results.faceLandmarks[468 + 5]],
      {
        color: "#fcd4db",
        lineWidth: 2,
      }
    );
  }
  drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
    color: "#FF1493",
    lineWidth: 5,
  });
  drawLandmarks(canvasCtx, results.leftHandLandmarks, {
    color: "#a640ff",
    lineWidth: 2,
  });
  drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
    color: "#a640ff",
    lineWidth: 5,
  });
  drawLandmarks(canvasCtx, results.rightHandLandmarks, {
    color: "#f67d92",
    lineWidth: 2,
  });
};

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await holistic.send({ image: videoElement });
  },
  width: 640,
  height: 480,
});
camera.start();
