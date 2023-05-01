import {shaderMaterial, OrbitControls} from "@react-three/drei"
import { extend } from "@react-three/fiber"
import { UnrealBloomPass } from 'three-stdlib'
import * as THREE from 'three'
import './style.css'
import { Perf } from "r3f-perf"
import Scene from "./Scene"



extend({ UnrealBloomPass })

export default function Experience()
{

    return <>
    

        {/* <Perf position="top-left" /> */}
        <OrbitControls makeDefault />
        <directionalLight
            shadow-mapSize={[1024, 1024]}
            castShadow
            position={[10 * 2, 20 * 2, 30 * 2]}
            shadow-camera-near={1}
            shadow-camera-far={200}
            shadow-camera-top={50}
            shadow-camera-right={50}
            shadow-camera-bottom={-50}
            shadow-camera-left={-50}
            shadow-normalBias={0.04}
            intensity={0.2}
        />
        <hemisphereLight intensity={0.4} color="#e4fbff" groundColor="#0099ff" />
        <ambientLight intensity={0.1} color="#b5e5ff" />

        <Scene />

    </> 
}