import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef,useEffect } from "react"

import * as THREE from 'three'

import fragmentShader from "./shaders/background/fragment"
import vertexShader from "./shaders/background/vertex"


const BackgroundMaterial = shaderMaterial(
    {
        uReseloution: new THREE.Vector2(window.innerWidth, window.innerHeight),
        uTime: 1
    },
    vertexShader,
    fragmentShader,
)

extend({ BackgroundMaterial })

console.log(window.screen)

export default function Background()
{   
    const materialRef = useRef()
    // useEffect(()=>{
    //     console.log(materialRef)
    //     // materialRef.current.depthWrite = false
    // }, [])

    useFrame((state, delta)=>{
        materialRef.current.uTime += delta
    })

    return <>
        <mesh >
            <planeGeometry args={[2, 2, 256, 256]} />
            <backgroundMaterial ref={materialRef} depthTest={false} />
        </mesh>
    </>
}