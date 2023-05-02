import React, { Suspense, useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, Vector3 as V3 } from '@react-three/fiber';
import cnBind, { Argument } from 'classnames/bind';
import CurlyWomanModel from 'models/CurlyWomanModel';

import { ModelViewerProps } from './ModelViewer.types';

import styles from './ModelViewer.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ModelViewer: React.FC<ModelViewerProps> = ({ mode }) => {
    const camera = useMemo(
        () =>
            mode !== 'avatar'
                ? { position: [0.2, 0.2, 0.7] as V3, fov: 50 }
                : { position: [0.2, 0.5, 1] as V3, fov: 30 },
        [mode],
    );

    return (
        <Canvas className={cx('model-viewer')} style={{ width: '100%', height: '100%' }} camera={camera}>
            {mode !== 'avatar' && <gridHelper args={[100, 100]} position={[0, -1, 0]} />}
            <ambientLight intensity={1.25} />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.4}>
                <orthographicCamera attach="shadow-camera" args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]} />
            </directionalLight>
            {mode !== 'avatar' && <OrbitControls />}
            <Suspense fallback={null}>
                <CurlyWomanModel />
            </Suspense>
        </Canvas>
    );
};
