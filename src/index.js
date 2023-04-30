import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import './reset.css'
import './style.css'
import Experience from "./Experience"
import * as THREE from 'three'
import { StrictMode } from "react"
import { Leva } from "leva"

import App from "./App"

const root = createRoot(document.querySelector('#root'))


root.render(
    <>
        <StrictMode>
            <Leva collapsed />
                <Canvas 
                    gl={{
                        toneMapping: THREE.ACESFilmicToneMapping,
                    }}
                    shadows
                    dpr={[1,1.5]}
                    camera={{
                        fov: 40,
                        // zoom: 100,
                        near: 0.1,
                        far: 400,
                        position: [0, -2, 10]
                    }}
                    >
                    <color args={['#0d1b21']} attach='background' />
                    <Experience />
                </Canvas>
                <App />
        </StrictMode>
    </>
)