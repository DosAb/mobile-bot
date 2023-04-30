import { useAnimations, useTexture, useGLTF, useVideoTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from 'three'


export default function Scene()
{

    const model = useGLTF('./mobileBot.glb')
    const botGeometry = model.nodes.bot.geometry
    const windowGeometry = model.nodes.aWindow.geometry

    const botBakedTexture = useTexture('./colorBaked2.jpg')
    botBakedTexture.flipY = false

    const videoTexture = useVideoTexture("./vintageVideo.mp4")
    videoTexture.flipY = false

    return <group rotation-y={Math.PI} >
        <mesh  geometry={botGeometry} >
            <meshBasicMaterial map={botBakedTexture} />
        </mesh>
        <mesh geometry={windowGeometry} >
            <meshBasicMaterial map={videoTexture} />
        </mesh>
    </group>  
}