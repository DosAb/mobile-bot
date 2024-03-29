import { shaderMaterial, useAnimations, useTexture, useGLTF, useVideoTexture, Float } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef } from "react"
import * as THREE from 'three'

import vertexShader from './shaders/vertex'
import fragmentShader from "./shaders/fragment"



export default function Scene()
{
    const tempArray = [...Array(20)]

    const botRef = useRef()

    
    const {strength, color,} = useControls('sphere',{
        strength: 
        {
            value: 1,
            min: 0,
            max: 2,
            step: 0.01,
        },
        color: '#9bb179',
    })

    

    const model = useGLTF('./mobileBot.glb')
    const botGeometry = model.nodes.bot.geometry
    const windowGeometry = model.nodes.aWindow.geometry

    const botBakedTexture = useTexture('./colorBaked2.jpg')
    botBakedTexture.flipY = false
    const lightMapTexture = useTexture('./lightMapBake.jpg')
    lightMapTexture.flipY = false
    // botBakedTexture.encoding = THREE.sRGBEncoding
    // botBakedTexture.mapping = THREE.ACESFilmicToneMapping

    const videoTexture = useVideoTexture("./vintageVideo.mp4")
    videoTexture.flipY = false

    const BotMaterial = shaderMaterial(
        {
            uBakedTexture: botBakedTexture,
            ulightMapTexture: lightMapTexture,
            uColor: new THREE.Color('#72B01D'),
            uStrength: 1,
            uTime: 0
        },
        vertexShader,
        fragmentShader,
    )
    
    extend({ BotMaterial })

    useFrame((state, delta)=>{
        botRef.current.uTime += delta
    })


    return<>
    {/* <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.4} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[1, 2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
    </Float> */}
            <group rotation-y={Math.PI} >
                <mesh  geometry={botGeometry} >
                    <botMaterial ref={botRef} uColor={color} uStrength={strength} />
                    {/* <meshBasicMaterial map={botBakedTexture} /> */}
                </mesh>
                <mesh geometry={windowGeometry} >
                    <meshBasicMaterial map={videoTexture} />
                </mesh>
            </group>  

    {/* {tempArray.map((value, index)=>{
        return<>
            <mesh position={[(Math.random() - 0.5) * 40 + (Math.random() < 0.5? -1 : 1),(Math.random() - 0.5) * 40 + (Math.random() < 0.5? -1 : 1),(Math.random() - 0.5) * 40 + (Math.random() < 0.5? -1 : 1)] } key={index}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh>
        </>
    })} */}

    </> 
}