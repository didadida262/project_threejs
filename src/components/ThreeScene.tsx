import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import gsap from 'gsap'
import * as dat from 'dat.gui'

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls
    cube: THREE.Mesh | null
    gui: dat.GUI | null
    animationId: number | null
  } | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const containerWidth = window.innerWidth
    const containerHeight = window.innerHeight

    // 场景
    const scene = new THREE.Scene()

    // 灯光配置 - 增强氛围
    // 主光源 - 冷色调
    const pointLight = new THREE.PointLight(0x4a9eff, 1.2, 100)
    pointLight.position.set(5, 3, 5)
    scene.add(pointLight)

    // 辅助光源 - 暖色调
    const pointLight2 = new THREE.PointLight(0xff6b9d, 0.8, 100)
    pointLight2.position.set(-5, -3, -5)
    scene.add(pointLight2)

    // 环境光 - 柔和的全局照明
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.4)
    scene.add(ambientLight)

    const sphereSize = 1
    const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize, '#4a9eff')
    scene.add(pointLightHelper)

    // 相机
    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000)
    camera.position.z = 5

    // 坐标系
    const axesHelper = new THREE.AxesHelper(500)
    axesHelper.setColors('red', 'green', 'orange')
    scene.add(axesHelper)

    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerWidth, containerHeight)
    // 设置酷炫的深蓝紫色渐变背景
    renderer.setClearColor(0x0a0a1a) // 深蓝紫色
    renderer.render(scene, camera)
    mountRef.current.appendChild(renderer.domElement)

    // 控制器
    const orbit = new OrbitControls(camera, renderer.domElement)
    orbit.enableDamping = true
    orbit.autoRotate = true

    const clock = new THREE.Clock()

    // 纹理
    const textureLoader = new THREE.TextureLoader()
    const pi = textureLoader.load('/earth.jpg')

    // 物体
    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const mesh = new THREE.MeshPhongMaterial({
      map: pi,
      color: 0xffffff,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const cube = new THREE.Mesh(geometry, mesh)
    // scene.add(cube) // 注释掉，因为原代码中也是注释的
    console.log('cube>>>', cube)

    // 导入模型
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.preload()
    dracoLoader.setDecoderPath('/draco/gltf/')
    loader.setDRACOLoader(dracoLoader)
    loader.load('/Pistol_Model.glb', (gltf) => {
      console.log('success!!!')
      const gun = gltf.scene
      scene.add(gun)
    }, undefined, (error) => {
      console.error('Error loading model:', error)
    })

    // 配置 GUI
    const gui = new dat.GUI()
    if (cube) {
      gui.add(cube.position, 'x').min(0).max(10).step(0.01).name('移动x')
      gui.add(cube.position, 'y').min(0).max(10).step(0.01).name('移动y')
      gui.add(cube.position, 'z').min(0).max(10).step(0.01).name('移动z')
      gui.add(cube, 'visible').name('show')

      const params = {
        color: '#000000',
        fn: () => {
          gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 })
        },
      }

      gui.add(params, 'fn').name('run')
      const folder = gui.addFolder('设置立方体')
      folder.add(cube.material, 'wireframe')
      folder.addColor(params, 'color').onChange((val: string) => {
        ;(cube.material as THREE.MeshPhongMaterial).color.set(val)
      })
    }

    // 动画循环
    const animate = () => {
      const delta = clock.getDelta()
      orbit.update()
      renderer.render(scene, camera)
      const animationId = requestAnimationFrame(animate)
      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }
    animate()

    // 保存引用
    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls: orbit,
      cube,
      gui,
      animationId: null,
    }

    // 窗口大小调整
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize)
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      if (sceneRef.current?.gui) {
        sceneRef.current.gui.destroy()
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}

export default ThreeScene

