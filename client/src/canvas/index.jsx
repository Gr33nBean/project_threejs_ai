import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  OrbitControls,
  Stats,
  Text,
} from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ fov: 75 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
      {/* <OrbitControls /> */}
      {/* <Stats /> */}
    </Canvas>
  );
};

export default CanvasModel;
