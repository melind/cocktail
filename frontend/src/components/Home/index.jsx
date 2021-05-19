import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import cocktailAPI from '../../services/cocktailAPI';
import {Carousel, Image, Card, Spin, Space} from 'antd';
import './index.css';


import * as dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import firefliesVertexShader from '../../shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from '../../shaders/fireflies/fragment.glsl'
import alcoolVertexShader from '../../shaders/alcool/vertex.glsl'
import alcoolFragmentShader from '../../shaders/alcool/fragment.glsl'

const Home = () => {

    const [cocktail, setCocktail] = useState([]);
    const [loading, setLoading] = useState(true);

    async function cocktailRandom() {  

        const randomCocktail = await cocktailAPI.cocktailRandom()
        .then(res => { 
            return res.data.cocktail.drinks[0];
            
        })
        .catch(err => {
           return err
        });
        setCocktail(randomCocktail);
        setLoading(false);
        }
    
        useEffect(() => {
        cocktailRandom();
        }, []); 
     
/**
 *   THREE JS
 */


 
 /**
  * Base
  */
 // Debug
 const debugObject = {}
 const gui = new dat.GUI({
     width: 400
 })
 
 // Canvas
 const canvas = document.getElementsByClassName('webgl')[0];//document.querySelector('canvas.webgl')
if (canvas){ 
 // Scene
 const scene = new THREE.Scene()
 
 /**
  * Loaders
  */
 // Texture loader
 const textureLoader = new THREE.TextureLoader()
 
 // Draco loader
 const dracoLoader = new DRACOLoader()
 dracoLoader.setDecoderPath('draco/')
 
 // GLTF loader
 const gltfLoader = new GLTFLoader()
 gltfLoader.setDRACOLoader(dracoLoader)
 
 /**
  * Textures
  */
  const bakedTexture = textureLoader.load('texture_cocktail.jpg')
  bakedTexture.flipY = false
 
 /**
  * Materials
  */
 // Baked material
 const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture /* to backside be visible, side: THREE.DoubleSide*/ })
 bakedTexture.encoding = THREE.sRGBEncoding
 
 const alcoolGeometry = new THREE.PlaneGeometry(50, 50, 52, 212) 
 // Colors
 debugObject.depthColor = '#009bdc'
 debugObject.surfaceColor = '#5cb9f7'
 
 gui.addColor(debugObject, 'depthColor').onChange(() => { alcoolMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor) })
 gui.addColor(debugObject, 'surfaceColor').onChange(() => { alcoolMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor) })
 
 const alcoolMaterial = new THREE.ShaderMaterial({
     vertexShader: alcoolVertexShader,
     fragmentShader: alcoolFragmentShader,
     uniforms:
     {
         uTime: { value: 0 },
         
         uBigWavesElevation: { value: 0.277 },
         uBigWavesFrequency: { value: new THREE.Vector2(0, 0.183) },
         uBigWavesSpeed: { value: 0.826 },
 
         uSmallWavesElevation: { value: 0.135 },
         uSmallWavesFrequency: { value: 2.96 },
         uSmallWavesSpeed: { value: 0.83 },
         uSmallIterations: { value: 3 },
 
         uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
         uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
         uColorOffset: { value: 0.08 },
         uColorMultiplier: { value: 5 }
     }
 })
 gui.add(alcoolMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
 gui.add(alcoolMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
 gui.add(alcoolMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
 gui.add(alcoolMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')
 
 
 gui.add(alcoolMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
 gui.add(alcoolMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
 gui.add(alcoolMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
 gui.add(alcoolMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')
 
 gui.add(alcoolMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
 gui.add(alcoolMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
 
 const alcool = new THREE.Mesh(alcoolGeometry, alcoolMaterial)
 alcool.rotation.x = - Math.PI * 0.5
 //alcool.position.z = -26.5
 alcool.position.y = -0.5
 scene.add(alcool)
 /**
  * Model
  */
 
 gltfLoader.load(
     'cocktail_scene_allin.glb',
     (gltf) => {
         /**
          * // traverse the whole scene if not merge in one mesh
                 gltf.scene.traverse((child) =>
                 {
                     child.material = bakedMaterial
                 })
 
          
          */
         
         scene.add(gltf.scene)
         const bakedMesh = gltf.scene.children.find((child) => child.name === 'Plane005') //name of mesh in collection
         bakedMesh.material = bakedMaterial
         
     }
 )
 
 /**
  * Fireflies
  */
 
 // Geometry
 
 const firefliesGeometry = new THREE.BufferGeometry()
 const firefliesCount = 30
 const positionArray = new Float32Array(firefliesCount * 3) //x,y,z
 const scaleArray = new Float32Array(firefliesCount)
 
 for(let i = 0; i < firefliesCount; i++)
 {
     positionArray[i * 3 + 0] = (Math.random() -0.5 ) * 4 //x
     positionArray[i * 3 + 1] = Math.random() * 4 //y high
     positionArray[i * 3 + 2] = (Math.random() -0.5) * 4 //z depth
 
     scaleArray[i] = Math.random()
 }
 
 firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))// how many values for a vertex
 firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))
 // Material
 const firefliesMaterial = new THREE.ShaderMaterial({
     uniforms:
     {
         uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) } ,//to have same size according to space use ratio
         uSize: { value: 100 },
         uTime: { value: 0 },
     },
     vertexShader: firefliesVertexShader,
     fragmentShader: firefliesFragmentShader,
     transparent: true,
     blending: THREE.AdditiveBlending,
     depthWrite: false, //save depthbufffer that behind a particule exist to avoid this late to be erased
 
  })
  gui.add(firefliesMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('firefliesSize')
 
 // Points
 const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
 scene.add(fireflies)
 
 /**
  * Sizes
  */
 const sizes = {
     width: window.innerWidth,
     height: window.innerHeight
 }
 
 window.addEventListener('resize', () =>
 {
     // Update sizes
     sizes.width = window.innerWidth
     sizes.height = window.innerHeight
 
     // Update camera
     camera.aspect = sizes.width / sizes.height
     camera.updateProjectionMatrix()
 
     // Update renderer
     renderer.setSize(sizes.width, sizes.height)
     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
 
     // Update fireflies
     firefliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2) // to be always good according to  device ratio
 })
 
 /**
  * Camera
  */
 // Base camera
 const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
 camera.position.x = 2
 camera.position.y = 2
 camera.position.z = 5
 scene.add(camera)
 
 // Controls
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true
 //
 /**
  * Renderer
  */
 const renderer = new THREE.WebGLRenderer({
   canvas,
 //    antialias: true
 })
 renderer.setSize(sizes.width, sizes.height)
 renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
 renderer.outputEncoding = THREE.sRGBEncoding
 
 // Clear color
 debugObject.clearColor = '#74c8f7'
 renderer.setClearColor(debugObject.clearColor)
 gui
     .addColor(debugObject, 'clearColor')
     .onChange(() =>
     {
         renderer.setClearColor(debugObject.clearColor)
     })
 
 /**
  * Animate
  */
 const clock = new THREE.Clock()
 
 const tick = () =>
 {
     const elapsedTime = clock.getElapsedTime()
 
     // Update materials
     firefliesMaterial.uniforms.uTime.value = elapsedTime
 
     alcoolMaterial.uniforms.uTime.value = elapsedTime
 
     // Update controls
     controls.update()
 
     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()
}
    return (
        <div className="home screen">
           
          {loading ? 
                 (<div className="spin">
                 <Space size="middle">
                     <Spin size="small" />
                     <Spin />
                     <Spin size="large" />
                  </Space>
                  </div>) 
                  :
                   (<Carousel effect='fade'  beforeChange={cocktailRandom} autoplay dots={false}  >
                        <div>
                            
                                <Link   to={`/cocktail/${ cocktail['strDrink'] }`} target="_parent" >
                                         <p>{ cocktail['strDrink'] } </p>
                                </Link>
                                <Image
                                         width={300}
                                         src={`${cocktail['strDrinkThumb']}`}  alt="cocktail"
                                       />
                              
                           
         
                      </div>
                      <div>
                                <Link  to={`/cocktail/${ cocktail['strDrink'] }`} target="_parent" >
                                         <p>{ cocktail['strDrink'] } </p>
                                </Link>
                                <Image
                                         width={300}
                                         src={`${cocktail['strDrinkThumb']}`}  alt="cocktail"
                                       />
                             
         
                      </div>
   
                      <div>
                                <Link   to={`/cocktail/${ cocktail['strDrink'] }`} target="_parent" >
                                         <p>{ cocktail['strDrink'] } </p>
                                </Link>
                                <Image
                                         width={300}
                                         src={`${cocktail['strDrinkThumb']}`}  alt="cocktail"
                                       />
                             
         
                      </div>
                      
                </Carousel>)}
          
               <h1> A Cocktail ?!</h1>
                  
                  <p>You're looking for a cocktail ? Want some inspiration ? You got  ingredients and do know what to do with ?
                    This website is for you !
                  </p>
                  <canvas className="webgl"></canvas>
       </div>
        
    )
}
export default Home;