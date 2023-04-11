/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import { generateEyeMaterial } from 'utils';

type GLTFResult = GLTF & {
    nodes: {
        EyeLeft: THREE.Mesh;
        EyeRight: THREE.Mesh;
        Wolf3D_Head: THREE.Mesh;
        Wolf3D_Teeth: THREE.Mesh;
        Wolf3D_Body: THREE.Mesh;
        Wolf3D_Outfit_Bottom: THREE.Mesh;
        Wolf3D_Outfit_Footwear: THREE.Mesh;
        Wolf3D_Outfit_Top: THREE.Mesh;
        Wolf3D_Hair: THREE.Mesh;
    };
    materials: {
        Wolf3D_Eye: THREE.MeshStandardMaterial;
        Wolf3D_Skin: THREE.MeshStandardMaterial;
        Wolf3D_Teeth: THREE.MeshStandardMaterial;
        Wolf3D_Body: THREE.MeshStandardMaterial;
        Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial;
        Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial;
        Wolf3D_Outfit_Top: THREE.MeshStandardMaterial;
        Wolf3D_Hair: THREE.MeshStandardMaterial;
    };
};

export default function Model({ ...props }: JSX.IntrinsicElements['group']) {
    const group = useRef<THREE.Group>(null);
    const { nodes, materials } = useGLTF('/curly-woman/curly-woman.gltf') as GLTFResult;
    const {
        nodes: { Wolf3D_Hair },
    } = useGLTF('/curly-woman.gltf') as GLTFResult;
    const material = generateEyeMaterial();

return (
        <group ref={group} {...props} dispose={null} position={[0, -1.5, 0]}>
            <mesh geometry={nodes.EyeLeft.geometry} material={material} />
            <mesh geometry={nodes.EyeRight.geometry} material={material} />
            <mesh geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} />
            <mesh geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} />
            {/* <mesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} /> */}
            {/* <mesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} /> */}
            {/* <mesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} /> */}
            {/* <mesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} /> */}
            <mesh geometry={Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} material-color="rebeccapurple" />
        </group>
    );
}

useGLTF.preload('/curly-woman/curly-woman.gltf');
