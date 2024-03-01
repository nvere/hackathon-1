import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
console.log(THREE)

function initGlobe(){
	let main = document.getElementById("main");
	console.log(main)
	const myGlobe = Globe();
	console.log(myGlobe)
	myGlobe(main).globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
}



function initISS(){
	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(75, 800/ 1000)

	scene.add(camera)

	let hlight = new THREE.AmbientLight(0x404040,100)
	scene.add(hlight)

	const renderer = new THREE.WebGLRenderer( { alpha: true })
	renderer.setSize(200, 200)

	document.body.appendChild(renderer.domElement)


	const loader = new GLTFLoader();

	loader.load('./ISS_stationary.glb', 
	function ( gltf ) {
		let ISS = gltf.scene.children[0]
		ISS.scale.set(0.01,0.01,0.01)
		scene.add( gltf.scene );
		renderer.render(scene,camera)}, 
		undefined, 
		function ( error ) {
		console.error( error );
	});

	renderer.render(scene, camera)	
}




initGlobe()
initISS()

