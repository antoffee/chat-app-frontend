import React, { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import cnBind, { Argument } from 'classnames/bind';
import CurlyWomanModel from 'models/CurlyWomanModel';

import { ModelViewerProps } from './ModelViewer.types';

import styles from './ModelViewer.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ModelViewer: React.FC<ModelViewerProps> = () => {
    return (
        <Canvas className={cx('model-viewer')} style={{ width: "100%", height: '100vh' }}>
            <gridHelper args={[50, 50]} position={[0, -1, 0]} />
            <ambientLight intensity={1.25} />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.4} />
            <OrbitControls />
            <Suspense fallback={null}>
                <CurlyWomanModel />
            </Suspense>
        </Canvas>
    );
};
