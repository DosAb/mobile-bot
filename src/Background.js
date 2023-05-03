import { shaderMaterial, useGLTF, useTexture, ContactShadows } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef,useEffect } from "react"

import * as THREE from 'three'

import fragmentShader from "./shaders/background/fragment"
import vertexShader from "./shaders/background/vertex"



const BackgroundMaterial = shaderMaterial(
    {
        uTime: 1,
        uTexture: 1
    },
    vertexShader,
    fragmentShader,
)

extend({ BackgroundMaterial })

export default function Background()
{   
    const model = useGLTF('./floor.glb')

    const floorTexture = useTexture('./floorBake.jpg')
    floorTexture.flipY = false

    const materialRef = useRef()
    // useEffect(()=>{
    //     console.log(materialRef)
        
    //     // materialRef.current.uTexture = botBakedTexture
    // }, [])

    useFrame((state, delta)=>{
        materialRef.current.uTime += delta
    })

    return <>
        <mesh rotation-x={Math.PI * 0.5} position-y={-5} rotation-y={Math.PI} >
            <planeGeometry args={[30, 30, 512, 512]} />
            <backgroundMaterial uTexture={floorTexture} ref={materialRef}/>
        </mesh>
    </>
}