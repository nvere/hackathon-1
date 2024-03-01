import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
console.log(THREE)
const myGlobe = Globe();

function initGlobe(){
	let main = document.getElementById("main");
	console.log(main)
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
		renderer.render(scene,camera)
		return ISS
	}, 
		undefined, 
		function ( error ) {
		console.error( error );
	});

	renderer.render(scene, camera)	
}




 //let iss = initISS()
function test(){
  
	// Gen random data
	const N = 1;
	const gData = [...Array(N).keys()].map(() => ({
	  lat: 180,
	  lng: 360,
	  alt: 1,
	  radius: 4,
	  color: 'grey'
	}));

	const world = Globe()
	  (document.getElementById('globeViz'))
	  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
	  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
	  .pointOfView({ altitude: 3.5 })
	  .customLayerData(gData)
	  .customThreeObject(d => new THREE.Mesh(
		new THREE.SphereGeometry(d.radius),
		new THREE.MeshLambertMaterial({ color: d.color })
	  ))
	  .customThreeObjectUpdate((obj, d) => {
		Object.assign(obj.position, world.getCoords(d.lat, d.lng, d.alt));
	  });

	(function moveSpheres() {
	  gData.forEach(d => d.lat += 0.2);
	  world.customLayerData(world.customLayerData());
	  requestAnimationFrame(moveSpheres);
	})();
}
test()