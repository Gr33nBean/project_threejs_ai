import React, { Suspense, useMemo } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame, useLoader } from "@react-three/fiber";
import { useTexture, OrbitControls, Stats, Text } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MeshBasicMaterial, MeshStandardMaterial } from "three";
import state from "../store";
import { generateUUID } from "three/src/math/MathUtils";

const Shirt = () => {
  const snap = useSnapshot(state);
  // const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const stateString = JSON.stringify(snap);

  const decor1 = useLoader(OBJLoader, "/Model3D/freepik/cupcake-topper.obj");
  const decor2 = useLoader(
    OBJLoader,
    "/Model3D/freepik/cake-pop-with-tag-001.obj"
  );

  const cake = useLoader(OBJLoader, "/Model3D/freepik/cake-002.obj");

  const [strawberry, vani] = useTexture(["/strawberry.png", "/vani.png"]);

  console.log(decor2.children.length);

  decor1.children.forEach((mesh, i) => {
    mesh.material = new MeshStandardMaterial({
      map: i % 2 === 0 ? vani : strawberry,
    });
    // mesh.material = new MeshBasicMaterial({
    //   color: colors[i],
    // });
  });

  decor2.children.forEach((mesh, i) => {
    mesh.material = new MeshStandardMaterial({
      map: i % 2 !== 0 ? vani : strawberry,
    });
    // mesh.material = new MeshBasicMaterial({
    //   color: colors[i],
    // });
  });

  cake.children.forEach((mesh, i) => {
    mesh.material = new MeshStandardMaterial({
      map: i % 2 !== 0 ? vani : strawberry,
    });
    // mesh.material = new MeshBasicMaterial({
    //   color: colors[i],
    // });
    mesh.castShadow = true;
  });

  return (
    <group
      key={stateString}
      scale={10}
      rotation={[0.3, 0, 0]}
      castShadow
      dispose={null}
    >
      <group>
        <group position={[-0.08, 0.02, -0.03]} rotation={[0, 0, 0.2]}>
          <primitive object={decor1.clone()} castShadow dispose={null} />
          <Text
            scale={12 / 1200}
            position={[0, 0.075, 0.0015]}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            Hi
          </Text>
        </group>

        <group position={[0.08, 0.02, -0.03]} rotation={[0, 0, -0.2]}>
          <primitive object={decor1.clone()} castShadow dispose={null} />
          <Text
            scale={12 / 1200}
            position={[0, 0.075, 0.0015]}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            Ha
          </Text>
        </group>
      </group>

      <group position={[0, 0.03, -0.03]} rotation={[0, 0, 0]} scale={0.7}>
        <primitive object={decor2.clone()} castShadow dispose={null} />
      </group>

      <primitive object={cake.clone()} castShadow dispose={null} />
    </group>
  );
};

const colors = ["red", "blue", "green", "purple"];

export default Shirt;
