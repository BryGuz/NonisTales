// @ts-nocheck
import './christmas.scss'

import * as THREE from 'https://cdn.skypack.dev/three@0.136.0'
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/RGBELoader.js'
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js'
import { AfterimagePass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/AfterimagePass.js'
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js'
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/FBXLoader.js'
import { useEffect } from 'react'

// DECLARE COMPOSER, MIXER
let composer: any
let body_01_mixer: any, eyes_01_mixer: any

export const Christmas = (): JSX.Element => {
  useEffect(() => {
    
    const newFn = async () => {
      // SET RENDERER
    var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvas'),
      antialias: true,
    })

    // SET UP CLOCK FOR THE ANIMATION LATER
    const clock = new THREE.Clock()

    // SET BACKGROUND COLOUR
    renderer.setClearColor(0x11151c)

    // USE THE DEVICE'S ASPECT RATIO
    renderer.setPixelRatio(window.devicePixelRatio)

    // SET THE RENDERER SIZE TO THE SIZE OF THE INNER WINDOW
    renderer.setSize(window.innerWidth, window.innerHeight)

    // CREATE NEW SCENE
    var scene = new THREE.Scene()

    // create a new RGBELoader to import the HDR
    const hdrEquirect = new RGBELoader()
      // add your HDR //
      .setPath(
        'https://raw.githubusercontent.com/miroleon/gradient_hdr_freebie/main/Gradient_HDR_Freebies/'
      )
      .load('ml_gradient_freebie_01.hdr', function () {
        // ALTERNATIVE GRADIENT
        // .load( 'ml_gradient_freebie_02.hdr', function () {

        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping
      })
    scene.environment = hdrEquirect

    // CREATE CAMERA AND SET POSITION
    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    // CAMERA POSITION ONLY WORKS IF IT ISN'T OVERWRITTEN BY THE ANIMATION (RIGHT NOW IT DOESN'T HAVE AN EFFECT)
    camera.position.z = 20
    camera.position.y = 40

    // MATERIAL FOR THE BLOB WHICH USES THE HDR TO GET IT'S COLOUR THROUGH REFLECTIONS
    var blob_mat = new THREE.MeshPhysicalMaterial({
      // WHITE COLOUR TO GET MORE REFLECTIONS
      color: 0xffffff,

      // ROUGHNESS TO GIVE THE MATERIAL A SOFT PLASTIC LOOK
      roughness: 0.3,

      // NO MATELNESS IN ORDER NOT TO MAKE THE MATERIAL TO SHINY
      metalness: 0,

      // USE THE HDR AS THE ENVIRONMENT MAP
      envMap: hdrEquirect,

      // DECLARE HOW MUCH OF AN EFFECT THE HDR HAS ON THE MATERIAL
      envMapIntensity: 0.5,
    })

    // UNI MATERIAL FOR THE EYES - THE EMISSIVENESS MAKES THAT THE MATERIAL DOESN'T REACT TO OTHER LIGHTS
    var uni_mat = new THREE.MeshPhysicalMaterial({
      // USE THE HDR AS THE ENVIRONMENT MAP
      envMap: hdrEquirect,

      // BUT MAKE IT HAVE NO IMPACT ON THE MATERIAL
      envMapIntensity: 0,

      // SET THE EMSSIVE COLOUR TO THE BACKGROUND COLOUR SO THAT IT BLENDS IN
      emissive: 0x11151c,
    })

    // SET SCALE FOR THE IMPORTED OBJECTS
    var scale = 0.03

    // LOAD THE BLOB
    const loader = new FBXLoader()
    const body_01 = await loader.loadAsync(
      'https://miroleon.github.io/daily-assets/body_03.fbx'
    )

    // ADD AN ANIMATION MIXER TO LOAD THE FILE'S ANIMATION
    body_01_mixer = new THREE.AnimationMixer(body_01)
    const body_01_action = body_01_mixer.clipAction(body_01.animations[0])
    body_01_action.play()

    body_01.traverse(function (child: any) {
      if (child.isMesh) {
        // ADD THE MATERIAL TO THE 3D MODEL
        child.material = blob_mat
      }
    })

    // SET POSITION
    body_01.position.set(0, -5, 0)

    // USE THE SCALE FROM ABOVE
    body_01.scale.setScalar(scale)

    // ADD THE BLOB'S BODY TO THE SCENE
    scene.add(body_01)

    // LOAD THE BLOB'S EYES (SEPARATE TO GIVE IT DIFFERENT MATERIALS MORE EASILY)
    const eyes_01 = await loader.loadAsync(
      'https://miroleon.github.io/daily-assets/eyes_03.fbx'
    )

    // ADD AN ANIMATION MIXER TO LOAD THE FILE'S ANIMATION
    eyes_01_mixer = new THREE.AnimationMixer(eyes_01)
    const eyes_01_action = eyes_01_mixer.clipAction(eyes_01.animations[0])
    eyes_01_action.play()

    eyes_01.traverse(function (child: any) {
      if (child.isMesh) {
        // ADD THE MATERIAL TO THE 3D MODEL
        child.material = uni_mat
      }
    })

    // SET POSITION
    eyes_01.position.set(0, -5, 0)

    // USE THE SCALE FROM ABOVE
    eyes_01.scale.setScalar(scale)

    // ADD THE BLOB'S EYES TO THE SCENE
    scene.add(eyes_01)

    // ADD FOG TO THE SCENE
    // REGULAR 'FOG' TO FADE TO THE BACKGROUND COLOUR (NOT NECESSARY HERE)
    // scene.fog = new THREE.Fog( 0x11151c, 1, 100 );

    // 'FOGEXP2' FOR CONTROLLING FOG DENSITY (IMPROTANTLY PLAYS TOGETHER WITH THE BLOOM LATER)
    // MORE DENSITY = DARKER
    // FIRST VALUE IS FOG COLOUR, SECOND VALUE IS FOG DENSITY
    // FOG DESNITY ALSO DEPENDS ON THE DISTANCE BETWEEN CAMERA AND OBJECT (JUST AS IRL)
    scene.fog = new THREE.FogExp2(0x11151c, 0.005)

    // POST PROCESSING
    // ADD A RENDERPASS TO COMBINE THE POST PROCESSING WITH THE SCENE WE CREATED ABOVE
    const renderScene = new RenderPass(scene, camera)

    // ADD AFTERIMAGE TO ADD THIS RETRO DRAG OF LIGHT IN THE ANIMATION
    const afterimagePass = new AfterimagePass()

    // DON'T GO TOO HIGH WITH THE 'DAMP' OR IT WILL BREAK THE SCENE
    afterimagePass.uniforms['damp'].value = 0.85

    // ADD YOUR BLOOM PARAMETERS HERE FOR BETTER OVERSIGHT
    const bloomparams = {
      // BLOOM STRENGTH
      bloomStrength: 1.35,

      //IF THE THRESHOLD VALUE IS TOO LOW THE WHOLE SCENE WILL TAKE THE COLOUR OF THE BLOOM
      bloomThreshold: 0.1,

      // VALUES HIGHER THAN 1 FOR THE BLOOM RADIUS TEND TO BREAK THE LOOK
      bloomRadius: 1,
    }

    // ADD THE BLOOMPASS AND THE PARAMTERS FROM ABOVE
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight)
    )
    bloomPass.threshold = bloomparams.bloomThreshold
    bloomPass.strength = bloomparams.bloomStrength
    bloomPass.radius = bloomparams.bloomRadius

    // ADD THE POST PROCESSING TO THE COMPOSER
    composer = new EffectComposer(renderer)
    composer.addPass(renderScene)
    composer.addPass(afterimagePass)
    composer.addPass(bloomPass)

    // RESIZE
    window.addEventListener('resize', onWindowResize)

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    let currentScroll = 0
    let targetScroll = 0
    let ease = 0.00025

    let theta1 = 0
    let theta2 = 0
    let theta3 = 0

    // Add this flag to control the animation loop
    let animationActive = true
    // Add this flag to control whether an animation frame has been requested
    let animationFrameRequested = false

    window.addEventListener('scroll', () => {
      targetScroll = window.pageYOffset
      updateScroll()

      const scrollArea = document.querySelector('.scroll-area')
      const scrollAreaRect = scrollArea?.getBoundingClientRect()
      const canvasContainer = document.querySelector('.canvas-container')
      const textContainer = document.querySelector('.text-container')

      // Check if the "scroll-area" div has scrolled out of view
      if (scrollAreaRect.bottom <= window.innerHeight) {
        // Hide the canvas
        canvasContainer.style.opacity = '0'
        textContainer.style.opacity = '0'

        // Stop the animation loop
        animationActive = false
        // Reset the animation frame requested flag
        animationFrameRequested = false
      } else {
        // Resume the animation loop and show the canvas if needed
        animationActive = true

        canvasContainer.style.opacity = '1'
        textContainer.style.opacity = '1'

        // Only request a new animation frame if one hasn't already been requested
        if (!animationFrameRequested) {
          requestAnimationFrame(animate)
          animationFrameRequested = true
        }
      }
    })

    function updateScroll() {
      currentScroll += (targetScroll - currentScroll) * ease

      theta2 = currentScroll * 0.07
      theta3 = currentScroll * 0.035

      setTimeout(updateScroll, 1000 / 60)
    }

    // DECLARE ALL THAT YOU WANT TO UDPATE CONTINUOUSLY IN THE UPDATE FUNCTION AND CALL IT LATER IN THE ANIMATE FUNCTION
    var update = function () {
      // MAKE THE THETA1 COUNT UP BY USING += SO THAT THE SIN AND COS FUNCTIONS DRAW A GRAPH
      // ALTERNATIVELY YOU COULD ALSO USE THE CLOCK HERE
      theta1 += 0.005 + window.pageYOffset * 0.0000025

      // BY USING THE SIN ON THE X AXIS AND THE COS ON THE Z AXIS, WE MOVE AROUND THE OBJECT IN A CIRCLE
      camera.position.x = -Math.sin(theta1 + 1) * (45 + theta2)
      camera.position.z = -Math.cos(theta1 + 1) * (45 + theta2)

      // UP AND DOWN MOVEMENT OF THE CAMERA
      camera.position.y = 20 * Math.cos(theta1 + 1) + 20 + theta3

      // IN ORDER FOR THE CAMERA TO MOVE AROUND THE OBJECT BUT STILL LOOK AT IT AT EVERY FRAME WE NEED TO ADD THE camera.lookAt INSIDE OF THE UPDATE FUNCTION
      camera.lookAt(0, 5, 0)
    }

    // HANDLE YOUR ANIMATION HERE
    function animate() {
      // Check the flag before running the animation
      if (animationActive) {
        // USE THE CLOCK'S DELTA TO GET A CONTINOUS UPWARD COUNTING
        const delta = clock.getDelta()

        // USE THE MIXER'S UPDATE FUNCTION TO KEEP THE ANIMATION RUNNING CONTINOUSLY (BY DIVIDING OR MULTIPLYING THE DELTA VALUE WE CAN MAKE THE ANIMATION RUN SLOWER OR FASTER)
        if (body_01_mixer) body_01_mixer.update(delta / 2)
        if (eyes_01_mixer) eyes_01_mixer.update(delta / 2)

        // CALL THE UPDATE FUNCTION FROM ABOVE
        update()

        // UPDATE THE COMPOSER
        composer.render()

        // REQUEST THE CURRENT ANIMATION FRAME
        requestAnimationFrame(animate)
      }
    }

    // REQUEST THE CURRENT ANIMATION FRAME OUTSIDE OF THE ANIMATION FUNCTION
    requestAnimationFrame(animate)
    }
    newFn()
  }, [])

  return (
    <>
      <div className='text-container'>
        <div className='title'>
          Nonis Tales
          <a href='https://instagram.com/miroxleon' target='_blank'><br/>
            Una historia interactiva
          </a>
        </div>
        <div className='socials'>
          <a href='' target='_blank'>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 22L2 22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M4 22V9.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M20 9.5V13.5M20 22V17.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z" stroke="#1C274C" stroke-width="1.5"/>
            </svg>
          </a>

          <a href='' target='_blank'>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 4C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V13M10 4C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H13" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M10 16H6" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="18" cy="17" r="3" stroke="#1C274C" stroke-width="1.5"/>
              <path d="M20.5 19.5L21.5 20.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M2 10L7 10M22 10L11 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </a>

          <a href='' target='_blank'>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1369 4.72848C14.5914 3.18295 13.8186 2.41018 12.816 2.12264C11.8134 1.83509 10.7485 2.08083 8.61875 2.57231L7.39057 2.85574C5.59881 3.26922 4.70292 3.47597 4.08944 4.08944C3.47597 4.70292 3.26922 5.59881 2.85574 7.39057L2.57231 8.61875C2.08083 10.7485 1.83509 11.8134 2.12264 12.816C2.41018 13.8186 3.18295 14.5914 4.72848 16.1369L6.55812 17.9665C9.24711 20.6555 10.5916 22 12.2623 22C13.933 22 15.2775 20.6555 17.9665 17.9665C20.6555 15.2775 22 13.933 22 12.2623C22 10.9198 21.1319 9.788 19.3957 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M8.60693 10.8789C9.7115 10.8789 10.6069 9.98348 10.6069 8.87891C10.6069 7.77434 9.7115 6.87891 8.60693 6.87891C7.50236 6.87891 6.60693 7.77434 6.60693 8.87891" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M11.5416 18.5001L12.5416 17.5001M18.5206 11.5209L14.9999 15.0417" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </a>
        </div>
      </div>

      <div className='canvas-container'>
        <canvas id='canvas'></canvas>
      </div>

      <div className='scroll-area'></div>

      <div className='more-content'>
        <div id='thank-you-note'>
          <h1>¡Feliz navidad! 🙏</h1><br/>
          <p>
            Las Nonis son seres mágicos de encanto y gracia, donde el amor y la magia se funden en una danza celestial. Descubre sus historias, secretos y cómo han cautivado el corazón de todos aquellos que han cruzado su camino.
            <br/><br/><strong>Nonis Tales CO</strong>.
          </p>
          <br/>
          <h3>Estamos bajo construcción</h3>
        </div>
      </div>
    </>
  )
}
